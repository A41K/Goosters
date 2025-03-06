// Game state
let game = {
    player: {
        name: "gooster",
        level: 1,
        maxHp: 100,
        currentHp: 100,
        stats: {
            health: 100,
            attack: 5,
            speed: 10,
            dodge: 5
        },
        experience: 0,
        experienceToLevel: 100,
        heals: 0,
        tomatoes: 0
    },
    enemy: {
        name: "slime",
        level: 1,
        maxHp: 50,
        currentHp: 50,
        stats: {
            health: 50,
            attack: 3,
            speed: 8,
            dodge: 3
        }
    },
    resources: {
        goo: 0,
        gold: 0
    },
    inventory: [],
    battleCount: 0,
    defeatedEnemies: 0
};

// Enemy types
const enemyTypes = [
    { name: "slime", color: "#00FF00", baseHealth: 50, baseAttack: 3, baseSpeed: 8, baseDodge: 3 },
    { name: "goblin", color: "#7CFC00", baseHealth: 70, baseAttack: 4, baseSpeed: 10, baseDodge: 4 },
    { name: "skeleton", color: "#A9A9A9", baseHealth: 80, baseAttack: 5, baseSpeed: 7, baseDodge: 6 },
    { name: "zombie", color: "#8FBC8F", baseHealth: 100, baseAttack: 6, baseSpeed: 5, baseDodge: 2 },
    { name: "ghost", color: "#E6E6FA", baseHealth: 60, baseAttack: 7, baseSpeed: 12, baseDodge: 10 },
    { name: "ares", color: "#FF0000", baseHealth: 120, baseAttack: 14, baseSpeed: 14, baseDodge: 19 },
    { name: "dragon", color: "#FF4500", baseHealth: 150, baseAttack: 15, baseSpeed: 6, baseDodge: 5 },
    { name: "demon", color: "#8B0000", baseHealth: 130, baseAttack: 12, baseSpeed: 9, baseDodge: 7 },
    { name: "golem", color: "#A0522D", baseHealth: 200, baseAttack: 10, baseSpeed: 3, baseDodge: 1 },
    { name: "vampire", color: "#4B0082", baseHealth: 110, baseAttack: 9, baseSpeed: 11, baseDodge: 8 }
];

// Items
const itemTypes = [
    { name: "Health Potion", description: "Restores 50 HP", price: 50, effect: "heal", value: 50, color: "#FF0000" },
    { name: "Strength Charm", description: "+2 Attack", price: 100, effect: "attack", value: 2, color: "#FFA500" },
    { name: "Speed Boots", description: "+2 Speed", price: 100, effect: "speed", value: 2, color: "#00FFFF" },
    { name: "Cloak of Evasion", description: "+2 Dodge", price: 100, effect: "dodge", value: 2, color: "#9370DB" },
    { name: "Heart Container", description: "+20 Max Health", price: 200, effect: "maxHealth", value: 20, color: "#FF69B4" },
    { name: "Golden Tomato", description: "+5 Tomatoes", price: 100, effect: "tomatoes", value: 5, color: "#FFD700" }
];

// Create a new array of powerful items
const bossItemTypes = [
    { name: "Divine Health Potion", description: "Restores 200 HP", price: 500, effect: "heal", value: 200, color: "#FF3333" },
    { name: "Legendary Strength Charm", description: "+5 Attack", price: 600, effect: "attack", value: 5, color: "#FF8C00" },
    { name: "Mythical Speed Boots", description: "+5 Speed", price: 600, effect: "speed", value: 5, color: "#00FFFF" },
    { name: "Epic Cloak of Evasion", description: "+5 Dodge", price: 600, effect: "dodge", value: 5, color: "#9370DB" },
    { name: "Golden Heart Container", description: "+50 Max Health", price: 800, effect: "maxHealth", value: 50, color: "#FF1493" },
    { name: "Legendary Tomato Basket", description: "+20 Tomatoes", price: 500, effect: "tomatoes", value: 20, color: "#FFD700" }
];

// DOM elements
const playerNameEl = document.getElementById('player-name');
const playerLevelEl = document.getElementById('player-level');
const playerHpBarEl = document.getElementById('player-hp-bar');
const playerHpTextEl = document.getElementById('player-hp-text');
const playerHealthEl = document.getElementById('player-health');
const playerAttackEl = document.getElementById('player-attack');
const playerSpeedEl = document.getElementById('player-speed');
const playerDodgeEl = document.getElementById('player-dodge');
const playerMonsterCanvas = document.getElementById('player-monster');
const playerMonsterCtx = playerMonsterCanvas.getContext('2d');

const enemyNameEl = document.getElementById('enemy-name');
const enemyLevelEl = document.getElementById('enemy-level');
const enemyHpBarEl = document.getElementById('enemy-hp-bar');
const enemyHpTextEl = document.getElementById('enemy-hp-text');
const enemyHealthEl = document.getElementById('enemy-health');
const enemyAttackEl = document.getElementById('enemy-attack');
const enemySpeedEl = document.getElementById('enemy-speed');
const enemyDodgeEl = document.getElementById('enemy-dodge');
const enemyMonsterCanvas = document.getElementById('enemy-monster');
const enemyMonsterCtx = enemyMonsterCanvas.getContext('2d');

const gooEl = document.getElementById('goo');
const goldEl = document.getElementById('gold');
const expTextEl = document.getElementById('exp-text');
const tomatoesTextEl = document.getElementById('tomatoes-text');
const healsTextEl = document.getElementById('heals-text');
const nextEnemyEl = document.getElementById('next-enemy');
const battleLogEl = document.getElementById('battle-log');

const fightBtn = document.getElementById('fight-btn');
const levelBtn = document.getElementById('level-btn');
const retreatBtn = document.getElementById('retreat-btn');
const tomatoBtn = document.getElementById('tomato-btn');
const inventoryBtn = document.getElementById('inventory-btn');
const shopBtn = document.getElementById('shop-btn');
const saveBtn = document.getElementById('save-btn'); // New save button (add to HTML)
const loadBtn = document.getElementById('load-btn'); // New load button (add to HTML)

const inventoryScreen = document.getElementById('inventory-screen');
const shopScreen = document.getElementById('shop-screen');
const levelupScreen = document.getElementById('levelup-screen');
const lootScreen = document.getElementById('loot-screen');
const gameOverScreen = document.getElementById('game-over-screen');

const closeInventoryBtn = document.getElementById('close-inventory-btn');
const closeShopBtn = document.getElementById('close-shop-btn');
const lootTakeBtn = document.getElementById('loot-take-btn');
const restartBtn = document.getElementById('restart-btn');

const healthOption = document.getElementById('health-option');
const attackOption = document.getElementById('attack-option');
const speedOption = document.getElementById('speed-option');
const dodgeOption = document.getElementById('dodge-option');

// LocalStorage functions
function saveGame() {
    try {
        localStorage.setItem('gameState', JSON.stringify(game));
        addLogEntry('Game saved successfully!');
    } catch (error) {
        addLogEntry('Failed to save game: ' + error.message);
        console.error('Save error:', error);
    }
}

function loadGame() {
    try {
        const savedGame = localStorage.getItem('gameState');
        if (savedGame) {
            game = JSON.parse(savedGame);
            addLogEntry('Game loaded successfully!');
            updateUI();
            drawPlayerMonster();
            drawEnemyMonster();
        } else {
            addLogEntry('No saved game found.');
        }
    } catch (error) {
        addLogEntry('Failed to load game: ' + error.message);
        console.error('Load error:', error);
    }
}

// Auto-save functionality
function autoSave() {
    saveGame();
}

// Initialize
function init() {
    // Try to load game on startup
    try {
        const savedGame = localStorage.getItem('gameState');
        if (savedGame) {
            game = JSON.parse(savedGame);
            addLogEntry('Previous game loaded successfully!');
        }
    } catch (error) {
        console.error('Error loading saved game:', error);
    }
    
    updateUI();
    drawPlayerMonster();
    drawEnemyMonster();
    
    // Set up event listeners
    fightBtn.addEventListener('click', startBattle);
    levelBtn.addEventListener('click', showLevelUpScreen);
    retreatBtn.addEventListener('click', retreat);
    tomatoBtn.addEventListener('click', useTomato);
    inventoryBtn.addEventListener('click', showInventory);
    shopBtn.addEventListener('click', showShop);
    
    // Add event listeners for save and load buttons
    if (saveBtn) saveBtn.addEventListener('click', saveGame);
    if (loadBtn) loadBtn.addEventListener('click', loadGame);
    
    closeInventoryBtn.addEventListener('click', hideInventory);
    closeShopBtn.addEventListener('click', hideShop);
    lootTakeBtn.addEventListener('click', hideLoot);
    restartBtn.addEventListener('click', restartGame);
    
    healthOption.addEventListener('click', () => levelUpStat('health'));
    attackOption.addEventListener('click', () => levelUpStat('attack'));
    speedOption.addEventListener('click', () => levelUpStat('speed'));
    dodgeOption.addEventListener('click', () => levelUpStat('dodge'));
    
    // Set up auto-save interval (every 2 minutes)
    setInterval(autoSave, 2 * 60 * 1000);
}

// Draw player monster
function drawPlayerMonster() {
    playerMonsterCtx.clearRect(0, 0, 16, 16);
    playerMonsterCtx.fillStyle = "#00BFFF";
    playerMonsterCtx.fillRect(4, 4, 8, 4);
    playerMonsterCtx.fillRect(2, 8, 12, 4);
    playerMonsterCtx.fillRect(6, 12, 4, 2);
    
    // Add details
    playerMonsterCtx.fillStyle = "#FFFFFF";
    playerMonsterCtx.fillRect(6, 10, 1, 1);
    playerMonsterCtx.fillRect(9, 10, 1, 1);
}

// Draw enemy monster
function drawEnemyMonster() {
    const enemy = enemyTypes.find(e => e.name === game.enemy.name);
    enemyMonsterCtx.clearRect(0, 0, 16, 16);
    
    if (game.enemy.name === "slime") {
        enemyMonsterCtx.fillStyle = enemy.color;
        enemyMonsterCtx.fillRect(3, 8, 10, 5);
        enemyMonsterCtx.fillRect(2, 10, 12, 3);
        
        // Eyes
        enemyMonsterCtx.fillStyle = "#000000";
        enemyMonsterCtx.fillRect(5, 9, 2, 2);
        enemyMonsterCtx.fillRect(10, 9, 2, 2);
    } else if (game.enemy.name === "ares") {
        enemyMonsterCtx.fillStyle = "#FF0000";
        enemyMonsterCtx.fillRect(3, 4, 10, 6);
        enemyMonsterCtx.fillRect(1, 10, 14, 3);
        
        // Eyes
        enemyMonsterCtx.fillStyle = "#000000";
        enemyMonsterCtx.fillRect(5, 7, 2, 2);
        enemyMonsterCtx.fillRect(9, 7, 2, 2);
    } else {
        // Generic enemy
        enemyMonsterCtx.fillStyle = enemy.color;
        enemyMonsterCtx.fillRect(4, 4, 8, 8);
        
        // Eyes
        enemyMonsterCtx.fillStyle = "#000000";
        enemyMonsterCtx.fillRect(6, 7, 1, 1);
        enemyMonsterCtx.fillRect(9, 7, 1, 1);
    }
}

// Update UI elements
function updateUI() {
    playerNameEl.textContent = game.player.name;
    playerLevelEl.textContent = `lv.${game.player.level}`;
    playerHpBarEl.style.width = `${(game.player.currentHp / game.player.maxHp) * 100}%`;
    playerHpTextEl.textContent = `hp:${game.player.currentHp}/${game.player.maxHp}`;
    playerHealthEl.textContent = game.player.stats.health;
    playerAttackEl.textContent = game.player.stats.attack;
    playerSpeedEl.textContent = game.player.stats.speed;
    playerDodgeEl.textContent = game.player.stats.dodge;
    
    enemyNameEl.textContent = game.enemy.name;
    enemyLevelEl.textContent = `lv.${game.enemy.level}`;
    enemyHpBarEl.style.width = `${(game.enemy.currentHp / game.enemy.maxHp) * 100}%`;
    enemyHpTextEl.textContent = `hp:${game.enemy.currentHp}/${game.enemy.maxHp}`;
    enemyHealthEl.textContent = game.enemy.stats.health;
    enemyAttackEl.textContent = game.enemy.stats.attack;
    enemySpeedEl.textContent = game.enemy.stats.speed;
    enemyDodgeEl.textContent = game.enemy.stats.dodge;
    
    gooEl.textContent = `goo: ${formatNumber(game.resources.goo)}`;
    goldEl.textContent = `gold: ${formatNumber(game.resources.gold)}`;
    expTextEl.textContent = `exp:${formatNumber(game.player.experience)}/${formatNumber(game.player.experienceToLevel)}`;
    tomatoesTextEl.textContent = `tomatoes:${formatNumber(game.player.tomatoes)}`;
    healsTextEl.textContent = `heals:${game.player.heals}${game.player.heals >= 99 ? '+' : ''}`;
    tomatoBtn.textContent = `Use Tomato (${game.player.tomatoes})`;
    
    // Disable level button if not enough exp
    if (game.player.experience < game.player.experienceToLevel) {
        levelBtn.classList.add('disabled');
    } else {
        levelBtn.classList.remove('disabled');
    }
    
    // Disable tomato button if no tomatoes
    if (game.player.tomatoes <= 0) {
        tomatoBtn.classList.add('disabled');
    } else {
        tomatoBtn.classList.remove('disabled');
    }
    
    // Preview next enemy
    const nextEnemyLevel = game.enemy.level + 1;
    const nextEnemyIndex = Math.min(Math.floor(nextEnemyLevel / 10), enemyTypes.length - 1);
    const nextEnemyName = enemyTypes[nextEnemyIndex].name;
    nextEnemyEl.textContent = `Next: ${nextEnemyName} lv.${nextEnemyLevel}`;
}

// Format numbers with suffix (k, M, B)
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    } else {
        return num.toString();
    }
}

// Add log entry
function addLogEntry(text) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = text;
    battleLogEl.appendChild(entry);
    battleLogEl.scrollTop = battleLogEl.scrollHeight;
    
    // Limit log entries
    while (battleLogEl.children.length > 20) {
        battleLogEl.removeChild(battleLogEl.firstChild);
    }
}

// Start battle
function startBattle() {
    fightBtn.disabled = true;
    
    addLogEntry(`Battle started! ${game.player.name} vs ${game.enemy.name}`);
    
    // Determine who goes first (based on speed)
    let playerFirst = game.player.stats.speed >= game.enemy.stats.speed;
    
    // Battle loop
    const battleInterval = setInterval(() => {
        if (playerFirst) {
            playerAttack();
            if (game.enemy.currentHp <= 0) {
                clearInterval(battleInterval);
                enemyDefeated();
                return;
            }
            
            setTimeout(() => {
                enemyAttack();
                if (game.player.currentHp <= 0) {
                    clearInterval(battleInterval);
                    playerDefeated();
                    return;
                }
            }, 500);
        } else {
            enemyAttack();
            if (game.player.currentHp <= 0) {
                clearInterval(battleInterval);
                playerDefeated();
                return;
            }
            
            setTimeout(() => {
                playerAttack();
                if (game.enemy.currentHp <= 0) {
                    clearInterval(battleInterval);
                    enemyDefeated();
                    return;
                }
            }, 500);
        }
        
        updateUI();
    }, 1000);
    
    // End battle after 10 seconds max (failsafe)
    setTimeout(() => {
        clearInterval(battleInterval);
        if (game.enemy.currentHp > 0 && game.player.currentHp > 0) {
            addLogEntry("Battle timed out!");
            fightBtn.disabled = false;
        }
    }, 10000);
}

// Player attack
function playerAttack() {
    // Check if enemy dodges
    const dodgeChance = game.enemy.stats.dodge / 100;
    if (Math.random() < dodgeChance) {
        addLogEntry(`${game.enemy.name} dodged the attack!`);
        return;
    }
    
    // Calculate damage
    const damage = Math.max(1, Math.floor(game.player.stats.attack * (0.8 + Math.random() * 0.4)));
    game.enemy.currentHp = Math.max(0, game.enemy.currentHp - damage);
    
    addLogEntry(`${game.player.name} dealt ${damage} damage to ${game.enemy.name}!`);
    
    // Critical hit
    if (Math.random() < 0.1) {
        const critDamage = Math.floor(damage * 0.5);
        game.enemy.currentHp = Math.max(0, game.enemy.currentHp - critDamage);
        addLogEntry(`CRITICAL HIT! Extra ${critDamage} damage!`);
    }
    
    updateUI();
}

// Enemy attack
function enemyAttack() {
    // Check if player dodges
    const dodgeChance = game.player.stats.dodge / 100;
    if (Math.random() < dodgeChance) {
        addLogEntry(`${game.player.name} dodged the attack!`);
        return;
    }
    
    // Calculate damage
    const damage = Math.max(1, Math.floor(game.enemy.stats.attack * (0.8 + Math.random() * 0.4)));
    game.player.currentHp = Math.max(0, game.player.currentHp - damage);
    
    addLogEntry(`${game.enemy.name} dealt ${damage} damage to ${game.player.name}!`);
    updateUI();
}

// Enemy defeated
function enemyDefeated() {
    addLogEntry(`${game.enemy.name} was defeated!`);
    
    // Calculate rewards
    const expGain = game.enemy.level * 20;
    const gooGain = game.enemy.level * 10;
    const goldGain = Math.floor(game.enemy.level * 5);
    
    game.player.experience += expGain;
    game.resources.goo += gooGain;
    game.resources.gold += goldGain;
    game.defeatedEnemies++;
    
    addLogEntry(`Gained ${expGain} exp, ${gooGain} goo, and ${goldGain} gold!`);
    
    // Check for level up
    if (game.player.experience >= game.player.experienceToLevel) {
        levelUp();
    }
    
    // Guaranteed tomato drop (was random before)
    const tomatoGain = Math.max(1, Math.floor(game.enemy.level / 3));
    game.player.tomatoes += tomatoGain;
    addLogEntry(`Found ${tomatoGain} tomato${tomatoGain > 1 ? 's' : ''}!`);
    
    // Chance for loot drop
    if (Math.random() < 0.2) {
        showLoot();
    }
    
    // Generate new enemy
    generateNewEnemy();
    
    // Re-enable fight button
    fightBtn.disabled = false;
    
    updateUI();
    
    // Auto-save after defeating an enemy
    if (game.defeatedEnemies % 5 === 0) {
        saveGame();
    }
}

// Player defeated
function playerDefeated() {
    addLogEntry(`${game.player.name} was defeated!`);
    
    // Show game over screen
    document.getElementById('game-over-stats').textContent = 
        `You reached level ${game.player.level} and defeated ${game.defeatedEnemies} enemies.
         Total gold earned: ${formatNumber(game.resources.gold)}
         Total goo collected: ${formatNumber(game.resources.goo)}`;
    
    gameOverScreen.style.display = 'block';
    
    // Save the game state even after defeat (for historical records)
    saveGame();
}

// Level up
function levelUp() {
    game.player.level++;
    game.player.experience -= game.player.experienceToLevel;
    game.player.experienceToLevel = Math.floor(game.player.experienceToLevel * 1.2);
    
    addLogEntry(`${game.player.name} leveled up to level ${game.player.level}!`);
    
    // Show level up screen
    showLevelUpScreen();
}

// Level up stat
function levelUpStat(stat) {
    switch(stat) {
        case 'health':
            game.player.stats.health += 10;
            game.player.maxHp += 10;
            game.player.currentHp += 10;
            break;
        case 'attack':
            game.player.stats.attack += 1;
            break;
        case 'speed':
            game.player.stats.speed += 1;
            break;
        case 'dodge':
            game.player.stats.dodge += 1;
            break;
    }
    
    addLogEntry(`Increased ${stat} stat!`);
    levelupScreen.style.display = 'none';
    updateUI();
    
    // Auto-save after level up
    saveGame();
}

// Generate new enemy
function generateNewEnemy() {
    game.battleCount++;
    
    // Determine enemy type based on level
    const enemyLevel = game.player.level + Math.floor(Math.random() * 2);
    const enemyIndex = Math.min(Math.floor(enemyLevel / 10), enemyTypes.length - 1);
    const enemyType = enemyTypes[enemyIndex];
    
    // Create enemy with scaled stats
    game.enemy = {
        name: enemyType.name,
        level: enemyLevel,
        maxHp: Math.floor(enemyType.baseHealth * (1 + 0.1 * enemyLevel)),
        stats: {
            health: Math.floor(enemyType.baseHealth * (1 + 0.1 * enemyLevel)),
            attack: Math.floor(enemyType.baseAttack * (1 + 0.1 * enemyLevel)),
            speed: Math.floor(enemyType.baseSpeed * (1 + 0.05 * enemyLevel)),
            dodge: Math.floor(enemyType.baseDodge * (1 + 0.05 * enemyLevel))
        }
    };
    
    game.enemy.currentHp = game.enemy.maxHp;
    
    // Special enemy every 10 battles
    if (game.battleCount % 10 === 0) {
        game.enemy.name = "ares";
        game.enemy.level = Math.floor(game.player.level * 1.5);
        game.enemy.maxHp = Math.floor(enemyTypes[5].baseHealth * (1 + 0.2 * game.enemy.level));
        game.enemy.stats = {
            health: Math.floor(enemyTypes[5].baseHealth * (1 + 0.2 * game.enemy.level)),
            attack: Math.floor(enemyTypes[5].baseAttack * (1 + 0.2 * game.enemy.level)),
            speed: Math.floor(enemyTypes[5].baseSpeed * (1 + 0.1 * game.enemy.level)),
            dodge: Math.floor(enemyTypes[5].baseDodge * (1 + 0.1 * game.enemy.level))
        };
        game.enemy.currentHp = game.enemy.maxHp;
        addLogEntry(`A powerful ${game.enemy.name} appears!`);
        
        // Add a flag to identify boss for later reward logic
        game.enemy.isBoss = true;
    }
    
    // Add a check for boss and guaranteed special loot
    if (game.enemy.isBoss) {
        // Boss drops OP items
        const randomIndex = Math.floor(Math.random() * bossItemTypes.length);
        const bossItem = bossItemTypes[randomIndex];
        
        // Add to inventory
        game.inventory.push({ ...bossItem });
        
        // Show special boss loot screen
        document.getElementById('loot-description').innerHTML = `
            <div style="text-align: center;">
                <div class="item-img" style="background-color: ${bossItem.color}; margin: 10px auto;"></div>
                <h3>${bossItem.name}</h3>
                <p>${bossItem.description}</p>
                <p style="color: #FF0000; font-weight: bold;">LEGENDARY DROP!</p>
            </div>
        `;
        
        lootScreen.style.display = 'block';
        addLogEntry(`The boss dropped a legendary ${bossItem.name}!`);
    }

    drawEnemyMonster();
    updateUI();
}

// Retreat from battle
function retreat() {
    // Penalty for retreating
    game.player.currentHp = Math.max(1, Math.floor(game.player.currentHp * 0.8));
    addLogEntry(`${game.player.name} retreated! HP reduced to ${game.player.currentHp}.`);
    
    generateNewEnemy();
    updateUI();
}

// Use tomato to heal
function useTomato() {
    if (game.player.tomatoes <= 0) {
        return;
    }
    
    game.player.tomatoes--;
    const healAmount = Math.floor(game.player.maxHp * 0.3);
    game.player.currentHp = Math.min(game.player.maxHp, game.player.currentHp + healAmount);
    game.player.heals++;
    
    addLogEntry(`Used a tomato! Healed for ${healAmount} HP.`);
    updateUI();
}

// Show inventory
function showInventory() {
    const inventoryItems = document.getElementById('inventory-items');
    inventoryItems.innerHTML = '';
    
    if (game.inventory.length === 0) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'item';
        emptyItem.textContent = 'Inventory is empty';
        inventoryItems.appendChild(emptyItem);
    } else {
        game.inventory.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            
            const itemImg = document.createElement('div');
            itemImg.className = 'item-img';
            itemImg.style.backgroundColor = item.color;
            
            const itemName = document.createElement('div');
            itemName.textContent = item.name;
            
            const itemDesc = document.createElement('div');
            itemDesc.textContent = item.description;
            
            const useButton = document.createElement('button');
            useButton.textContent = 'Use';
            useButton.addEventListener('click', () => useItem(index));
            
            itemElement.appendChild(itemImg);
            itemElement.appendChild(itemName);
            itemElement.appendChild(itemDesc);
            itemElement.appendChild(useButton);
            
            inventoryItems.appendChild(itemElement);
        });
    }
    
    inventoryScreen.style.display = 'block';
}

// Hide inventory
function hideInventory() {
    inventoryScreen.style.display = 'none';
}

// Use item from inventory
function useItem(index) {
    const item = game.inventory[index];
    
    switch(item.effect) {
        case 'heal':
            game.player.currentHp = Math.min(game.player.maxHp, game.player.currentHp + item.value);
            game.player.heals++;
            addLogEntry(`Used ${item.name}! Healed for ${item.value} HP.`);
            break;
        case 'attack':
            game.player.stats.attack += item.value;
            addLogEntry(`Used ${item.name}! Attack increased by ${item.value}.`);
            break;
        case 'speed':
            game.player.stats.speed += item.value;
            addLogEntry(`Used ${item.name}! Speed increased by ${item.value}.`);
            break;
        case 'dodge':
            game.player.stats.dodge += item.value;
            addLogEntry(`Used ${item.name}! Dodge increased by ${item.value}.`);
            break;
        case 'maxHealth':
            game.player.stats.health += item.value;
            game.player.maxHp += item.value;
            game.player.currentHp += item.value;
            addLogEntry(`Used ${item.name}! Max HP increased by ${item.value}.`);
            break;
        case 'tomatoes':
            game.player.tomatoes += item.value;
            addLogEntry(`Used ${item.name}! Gained ${item.value} tomatoes.`);
            break;
    }
    
    // Remove the used item from inventory
    game.inventory.splice(index, 1);
    
    // Save game after using an item
    saveGame();
    
    // Update UI and close inventory
    updateUI();
    hideInventory();
}

// Show shop
function showShop() {
    const shopItems = document.getElementById('shop-items');
    shopItems.innerHTML = '';
    
    // Determine which item types to show based on player level
    const itemsToShow = game.player.level >= 10 ? [...itemTypes, ...bossItemTypes] : itemTypes;
    
    itemsToShow.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        
        const itemImg = document.createElement('div');
        itemImg.className = 'item-img';
        itemImg.style.backgroundColor = item.color;
        
        const itemName = document.createElement('div');
        itemName.textContent = item.name;
        
        const itemDesc = document.createElement('div');
        itemDesc.textContent = item.description;
        
        const buyButton = document.createElement('button');
        buyButton.textContent = `Buy (${item.price} gold)`;
        
        if (game.resources.gold < item.price) {
            buyButton.disabled = true;
            buyButton.classList.add('disabled');
        }
        
        buyButton.addEventListener('click', () => buyItem(item));
        
        itemElement.appendChild(itemImg);
        itemElement.appendChild(itemName);
        itemElement.appendChild(itemDesc);
        itemElement.appendChild(buyButton);
        
        shopItems.appendChild(itemElement);
    });
    
    shopScreen.style.display = 'block';
}

// Hide shop
function hideShop() {
    shopScreen.style.display = 'none';
}

// Buy item from shop
function buyItem(item) {
    if (game.resources.gold < item.price) {
        addLogEntry(`Not enough gold to buy ${item.name}!`);
        return;
    }
    
    game.resources.gold -= item.price;
    game.inventory.push({ ...item });
    addLogEntry(`Bought ${item.name} for ${item.price} gold!`);
    
    // Save game after purchase
    saveGame();
    
    updateUI();
    showShop(); // Refresh the shop
}

// Show level up screen
function showLevelUpScreen() {
    if (game.player.experience < game.player.experienceToLevel) {
        addLogEntry("Not enough experience to level up!");
        return;
    }
    
    levelupScreen.style.display = 'block';
}

// Show loot screen
function showLoot() {
    // Generate random item (normal enemies get normal items, bosses get boss items)
    const itemTypes = game.enemy.isBoss ? bossItemTypes : itemTypes;
    const randomIndex = Math.floor(Math.random() * itemTypes.length);
    const item = itemTypes[randomIndex];
    
    // Add to inventory
    game.inventory.push({ ...item });
    
    // Display loot information
    document.getElementById('loot-description').innerHTML = `
        <div style="text-align: center;">
            <div class="item-img" style="background-color: ${item.color}; margin: 10px auto;"></div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    lootScreen.style.display = 'block';
    addLogEntry(`Found a ${item.name}!`);
    
    // Save game after getting loot
    saveGame();
}

// Hide loot screen
function hideLoot() {
    lootScreen.style.display = 'none';
}

// Restart game
function restartGame() {
    // Create backup of previous game
    const prevGameJson = JSON.stringify(game);
    localStorage.setItem('previousGame', prevGameJson);
    
    // Reset game state
    game = {
        player: {
            name: "gooster",
            level: 1,
            maxHp: 100,
            currentHp: 100,
            stats: {
                health: 100,
                attack: 5,
                speed: 10,
                dodge: 5
            },
            experience: 0,
            experienceToLevel: 100,
            heals: 0,
            tomatoes: 0
        },
        enemy: {
            name: "slime",
            level: 1,
            maxHp: 50,
            currentHp: 50,
            stats: {
                health: 50,
                attack: 3,
                speed: 8,
                dodge: 3
            }
        },
        resources: {
            goo: 0,
            gold: 0
        },
        inventory: [],
        battleCount: 0,
        defeatedEnemies: 0
    };
    
    // Save the new game
    saveGame();
    
    // Hide game over screen
    gameOverScreen.style.display = 'none';
    
    // Reinitialize
    updateUI();
    drawPlayerMonster();
    drawEnemyMonster();
    
    addLogEntry("Game restarted!");
}

// Add automatic save on page unload
window.addEventListener('beforeunload', () => {
    saveGame();
});

// Initialize on page load
window.addEventListener('load', init);