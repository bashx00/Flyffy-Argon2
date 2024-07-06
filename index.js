// Importation des modules nécessaires
const crypto = require('crypto');
const argon2 = require('argon2');

// Fonction pour générer un mot de passe aléatoire
function generateRandomPassword(length) {
    // Définition des caractères possibles dans le mot de passe
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    
    // Boucle pour générer chaque caractère du mot de passe
    for (let i = 0; i < length; i++) {
        // Sélection aléatoire d'un indice dans le charset
        const randomIndex = crypto.randomInt(0, charset.length);
        // Ajout du caractère correspondant au mot de passe
        password += charset[randomIndex];
    }
    return password;
}

// Fonction pour hasher le mot de passe avec Argon2
async function hashPassword(password) {
    try {
        // Définition du coût mémoire pour Argon2 (100 MiB)
        const memoryCost = 102400; // 100 MiB (100 * 1024)
        
        // Hasher le mot de passe avec les paramètres définis, y compris parallelism à 3
        const hash = await argon2.hash(password, {
            type: argon2.argon2id, // Utilisation du type Argon2id pour plus de sécurité
            memoryCost: memoryCost, // Coût mémoire
            timeCost: 4, // Coût temporel
            parallelism: 3, // Niveau de parallélisme
        });
        return hash;
    } catch (err) {
        // Gestion des erreurs lors du hashage
        console.error('Error hashing password:', err);
    }
}

// Fonction principale pour générer et hasher un mot de passe
async function main() {
    // Génération d'un mot de passe aléatoire de 16 caractères (plus de sécurité)
    const password = generateRandomPassword(16); // Increased length for more security
    console.log(`Generated Password: ${password}`);
    
    // Hashage du mot de passe généré
    const hashedPassword = await hashPassword(password);
    console.log(`Hashed Password: ${hashedPassword}`);
}

// Exécution de la fonction principale
main();
