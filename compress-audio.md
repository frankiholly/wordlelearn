# Audio File Compression Guide

## Problem
Your `celebrate.mp3` file is 3.7MB, which is too large for Git and causes deployment issues.

## Solution: Compress in GarageBand

### 1. Re-export from GarageBand:
- **Format**: MP3
- **Quality**: Medium Quality (128 kbps) 
- **Sample Rate**: 22050 Hz (half of 44100)
- **Duration**: Trim to 8-10 seconds maximum

### 2. Target File Size:
- **Goal**: Under 500KB (0.5MB)
- **Current**: 3.7MB → **Target**: < 0.5MB

### 3. GarageBand Export Settings:
```
Format: MP3
Quality: Medium Quality
Sample Rate: 22050 Hz
Bit Rate: 128 kbps
Channels: Stereo
Duration: 8-10 seconds
```

### 4. Alternative: Use Online Compressor
- Upload to: https://www.freeconvert.com/mp3-compressor
- Target size: 500KB or less
- Maintain quality while reducing file size

### 5. Save As:
- Name: `celebrate-compressed.mp3`
- Place in: `src/assets/audio/`
- Update import in ExtremeWinCelebration.js

## Once Compressed:
1. Delete the large 3.7MB file
2. Add the compressed version
3. Update the import path
4. Deploy again
