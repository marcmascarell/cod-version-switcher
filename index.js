const fs = require('fs')
const path = require('path');
const codPath = process.cwd()
// Development
// const codPath = 'C:\\Program Files (x86)\\Call of Duty Game of the Year Edition\\'

const version11FilesPath = path.join(__dirname, 'files/CodVersionFiles-1.1')
const version15FilesPath = path.join(__dirname, 'files/CodVersionFiles-1.5')

const readDir = (directory, filesAccumulator = []) => {
    fs.readdirSync(directory).forEach(file => {
        const filePath = `${directory}/${file}`
        const fileStat = fs.statSync(filePath)

        if (fileStat.isDirectory()) {
            return readDir(filePath, filesAccumulator)
        }

        filesAccumulator.push(filePath)
    })

    return filesAccumulator
}

const getInstalledVersion = () => {
    if (fs.existsSync(path.join(codPath, 'Main', 'paka.pk3'))) {
        return '1.5'
    }

    return '1.1'
}

const deleteFiles = files => {
    console.log('Removing files...')

    files.forEach(file => {
        const codFilePath = path.normalize(`${codPath}${file.replace(version15FilesPath, '').replace(version11FilesPath, '')}`)

        if (!fs.existsSync(`${codFilePath}`)) {
            // console.log(`The file ${codFilePath} does not exist`)
            return
        }

        fs.unlinkSync(codFilePath)

        if (!fs.existsSync(`${codFilePath}`)) {
            // console.log(`${codFilePath} successfully removed.`)
        }
    })
}

function copyFile(source, target) {
    var rd = fs.createReadStream(source);
    var wr = fs.createWriteStream(target);
    return new Promise(function(resolve, reject) {
        rd.on('error', reject);
        wr.on('error', reject);
        wr.on('finish', resolve);
        rd.pipe(wr);
    }).catch(function(error) {
        rd.destroy();
        wr.end();
        throw error;
    });
}

const copyFiles = files => {
    console.log('Copying new files...')

    return new Promise((resolve) => {
        const promises = []

        files.forEach(file => {
            const codFilePath = path.normalize(`${codPath}${file.replace(version15FilesPath, '').replace(version11FilesPath, '')}`)

            promises.push(copyFile(file, codFilePath))
        })

        Promise.all(promises).then(() => {
            console.log('Files copied.')

            checkFilesExist(files)

            resolve()
        })
    })
}

const checkFilesExist = (files) => {
    files.forEach(file => {
        const codFilePath = path.normalize(`${codPath}${file.replace(version15FilesPath, '').replace(version11FilesPath, '')}`)

        const exists = fs.existsSync(`${codFilePath}`);

        if (! exists) {
            throw Error('Files were not copied successfully')
        }

        // console.log(`File ${codFilePath} exists: ${exists}`)
    })
}

const notifyAndAskForExit = (notification) => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question(`${notification}\n\nPress any key to exit...`, () => {
        readline.close()
    })
}

const isInCorrectPath = () => {
    return fs.existsSync(path.join(codPath, 'CoDMP.exe'))
}

if (!isInCorrectPath()) {
    notifyAndAskForExit('WARNING: This file should be in the same directory than your `CoDMP.exe` file.\nUsually its something similar to `C:\\Program Files (x86)\\Call of Duty`')
    return
}

const files15 = readDir(version15FilesPath)
const files11 = readDir(version11FilesPath)

const detectedVersion = getInstalledVersion()

console.log(`Detected version: ${detectedVersion}\n`)

if (process.argv[2] && process.argv[2] === detectedVersion) {
    notifyAndAskForExit(`Patch ${detectedVersion} is already the current installed one.`)
    return
}

const configPath = path.join(codPath, 'Main', 'config_mp.cfg')
const configBackupPath = path.join(codPath, 'Main', 'config_mp.backup.cfg')

if (fs.existsSync(configPath) && !fs.existsSync(configBackupPath)) {
    console.log('Making config_mp.cfg backup.')
    fs.copyFileSync(configPath, configBackupPath)
}

if (detectedVersion === '1.5') {
    deleteFiles(files15)

    copyFiles(files11).then(() => {
        notifyAndAskForExit('\n1.1 Patch applied!')
    })
} else {
    deleteFiles(files11)

    copyFiles(files15).then(() => {
        notifyAndAskForExit('\n1.5 Patch applied!')
    })
}






