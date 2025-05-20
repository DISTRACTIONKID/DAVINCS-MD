const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BpVysrR01BRk9IeU44d3V3S3N1SzE4OEpGZ2hwMG5IR3JZaXNnaStWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmVlUVRzcWVKT0EyUHNDZmZ6UkZUamVJUnJCblNiUHlGZTl3cVh2WDhUdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRDNZUG51SEdWOVFuUnMxbVBLdE9mQmhTK0ZnUVpOV0gvZkwzMWFvZGxVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaaTQyZ3NDZTBHR3UrVEExZ2ZKMm5kMzgzVFcyblExV3pYR2ExMm5tdkZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNMUDNiRndabUpsd0o2UUVLd2tyUFM1d1p1K0Jkd3VLZFJTWHZQcnM3VWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRsQmpYc1RKbVdDL2lTaWh3ZFpqekZ6MGQxbTVIVzZ0UTNlQjQ0S2lyZ2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUdKTlpGMThNQ2tUYmVwV2FLZFRHNkw3SHBGcUlIb0xuUzZhTFNOYTdGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVltN2VwQTVnYTFhS1YvRjdzbzA0MWRMVnVKOW9ydnBtSThCTnAxVW95bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllzUGZFeWdQSWNhbnVVQWRUYlVmbzFwMzhHajE3aGJ5cWZjZDNLWS8yK1Q5aXFKbVZpSXBxRWcrY0h5UkduVFBWYzlCWlVnSDk1WVJiUXhNR1hyYWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc4LCJhZHZTZWNyZXRLZXkiOiJxWHUrdS91NmhLWUpZc1hzNUhvYnB2SHg5MFpBWENqVWtsZWRUd3F3VGdFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4U3N6ZXk1VVFaNk5UNWs1d3V1dU5nIiwicGhvbmVJZCI6IjJkYzBiZmM0LWNlMDktNDQxNy05YjBmLWEwMzExNjIzMTYyMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqSUp3b2FFbzB0TjlSNng4eE54Z1NaL0hWSlU9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImN1T1JOUXBuVFRqVVVocDlXaHBkY1VncVVNbz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pEZThaNERFT1Rac01FR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkpsSkpDWlBWVk5EY3M5STNCYkFXRW9Xb21KNUdiNUdrQUIzTTNEL09QUjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRsaFJNMHhnMVYxeUJsc3VQNkhBcjZRRXJTWVAveVBybDhnTy9FanZETDBtcWJGYk1KbEJxZ2ppall5NDAxVGQ4OXBscFBLTGJyVlRIRWgvSVFSa0R3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJqWDR6SldEaHNHNElXODhsSmxBS2ExV0RKdU50RFdsRURNWlBGMUg0QU5jVlhMeFFsNDkxQmw3R2h5ZmZyZjY2T09ZejZGc2J1SUVBNEZMZkd4UVZnQT09In0sIm1lIjp7ImlkIjoiMjU1NzU5MTEyMDEwOjU3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImtpZGkiLCJsaWQiOiI2OTk0NDA0NTc0MDI0MDo1N0BsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzU5MTEyMDEwOjU3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNaU1NRbVQxVlRRM0xQU053V3dGaEtGcUppZVJtK1JwQUFkek53L3pqMGQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzcyNTU1NCwibGFzdFByb3BIYXNoIjoiM2dQVUprIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFR1AifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/9Wish882/DAVINCS-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Allan",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255759112010",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/oc5rvp.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by davincs md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakSTEQGZNCk6CqE9E2P",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakSTEQGZNCk6CqE9E2P",
    CAPTION : process.env.CAPTION || "✧⁠DAVINCS_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠DAVINCS_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

