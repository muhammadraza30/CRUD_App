require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query } = require('./db');

const runMigrations = async () => {
  try {
    console.log('Running migrations...');
    
    // Read the migration files
    const migrationDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    // Execute each migration
    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationDir, file), 'utf8');
      await query(sql);
    }
    
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

runMigrations();