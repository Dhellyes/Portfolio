const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/images';
const outputDir = './src/assets/images/optimized';

// Créer le dossier optimized s'il n'existe pas
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Fonction de compression
async function compressImage(inputPath, outputPath) {
    try {
        // Obtenir l'extension du fichier
        const ext = path.extname(inputPath).toLowerCase();
        
        // Si c'est un PDF, le copier simplement
        if (ext === '.pdf') {
            fs.copyFileSync(inputPath, outputPath);
            console.log(`Copié: ${outputPath}`);
            return;
        }

        // Pour les images
        await sharp(inputPath)
            .resize(1920, 1080, { 
                fit: 'inside',
                withoutEnlargement: true 
            })
            .jpeg({ quality: 80 })
            .toFile(outputPath.replace(ext, '.jpg'));
        
        console.log(`Compressé: ${outputPath}`);
    } catch (error) {
        console.error(`Erreur avec ${inputPath}:`, error);
    }
}

// Traiter tous les fichiers
fs.readdirSync(inputDir).forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    // Ignorer le dossier optimized lui-même
    if (file === 'optimized') return;
    
    compressImage(inputPath, outputPath);
});