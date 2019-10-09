# CoD (1) Version Switcher

Allows changing between CoD versions easily **1.1 <-> 1.5**.

# Why?

Community is fragmented and mainly playing those two versions, for those who want to have an easy way to change
 without 2 different version installations this tool can be helpful. 
 
 
 I was working on this as a dependency for
  another project that would let you join any server and switching version without you having to do anything.
 
# Building

Requirements:

1. You will need the Activision owned files with this structure (Please be aware that I'm not providing the required files, just the utility):

    - /files
        - /CodVersionFiles-1.1
            - /Main
                - cgame_mp_x86.dll
                - game_mp_x86.dll
                - localized_english_pak0.pk3
                - localized_english_pak1.pk3
                - ui_mp_x86.dll
            - CoDMP.exe
        - /CodVersionFiles-1.5
            - /Main
                - cgame_mp_x86.dll
                - game_mp_x86.dll
                - localized_english_pak0.pk3
                - localized_english_pak1.pk3
                - localized_english_pak2.pk3
                - localized_english_pak3.pk3
                - localized_english_pak5.pk3
                - pak8.pk3
                - pak9.pk3
                - paka.pk3
                - pakb.pk3
                - ui_mp_x86.dll
            - CoDMP.exe

1. Install [Node JS](https://nodejs.org/es/download/) version >= 8

1. Install dependencies:

    `npm install`

1. Build:

    `npm run build`

1. Done.

# Execution

After the build step (look above) you will have a `.exe` similar to `CodVersionSwitcher-2.1.0-x64.exe`, put it on
 your CoD folder alongside `CoDMP.exe` (Example of path: `C:\Program Files (x86)\Call of Duty`).
 
Now just double click `CodVersionSwitcher-2.1.0-x64.exe` and it will toggle version (so if you have 1.1 it will
 change it to 1.5 and viceversa).
 
 # Licence
 
 MIT
