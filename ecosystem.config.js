module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      max_memory_restart: '200M', // Utilisation maximale de la mémoire (200 Mo)
      error_file: './logs/err.log', // Chemin vers le fichier journal d'erreurs
      exec_mode: 'cluster', // Mode d'exécution pour plusieurs instances
      instances: 3, // Nombre d'instances à lancer
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

// pm2 start ecosystem.config.js
// pm2 start ./www/app.js  -i 3  
