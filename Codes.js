// Add these cheat functions at the end of your file but before the init() call

// Cheat to add levels to the player
function cheatAddLevels(levels = 1) {
    for (let i = 0; i < levels; i++) {
        game.player.level++;
        // Increase stats with each level
        game.player.stats.health += 10;
        game.player.maxHp += 10;
        game.player.currentHp = game.player.maxHp; // Fully heal
        game.player.stats.attack += 1;
        game.player.stats.speed += 1;
        game.player.stats.dodge += 1;
    }
    
    // Update experience to match level
    game.player.experienceToLevel = Math.floor(100 * Math.pow(1.2, game.player.level - 1));
    
    addLogEntry(`CHEAT: Added ${levels} levels! Now level ${game.player.level}`);
    updateUI();
}

// Cheat to force battle with specific enemy
function cheatForceBattle(enemyName, enemyLevel = game.player.level + 5) {
    const enemyTypeIndex = enemyTypes.findIndex(e => e.name.toLowerCase() === enemyName.toLowerCase());
    
    if (enemyTypeIndex === -1) {
        addLogEntry(`CHEAT ERROR: Enemy "${enemyName}" not found! Available enemies: ${enemyTypes.map(e => e.name).join(', ')}`);
        return;
    }
    
    const enemyType = enemyTypes[enemyTypeIndex];
    
    // Create enemy with specified level
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
    
    // If it's the boss enemy, make it more powerful
    if (enemyType.name === "ares") {
        game.enemy.isBoss = true;
        game.enemy.maxHp = Math.floor(game.enemy.maxHp * 1.5);
        game.enemy.stats.health = game.enemy.maxHp;
        game.enemy.stats.attack = Math.floor(game.enemy.stats.attack * 1.5);
    }
    
    game.enemy.currentHp = game.enemy.maxHp;
    
    addLogEntry(`CHEAT: Forced battle with ${game.enemy.name} (Lv.${game.enemy.level})`);
    drawEnemyMonster();
    updateUI();
}

// Cheat to add resources (gold, goo, tomatoes)
function cheatAddResources(gold = 1000, goo = 1000, tomatoes = 10) {
    game.resources.gold += gold;
    game.resources.goo += goo;
    game.player.tomatoes += tomatoes;
    
    addLogEntry(`CHEAT: Added ${gold} gold, ${goo} goo, and ${tomatoes} tomatoes!`);
    updateUI();
}

// Cheat to fully heal the player
function cheatFullHeal() {
    game.player.currentHp = game.player.maxHp;
    addLogEntry(`CHEAT: Player fully healed to ${game.player.currentHp} HP!`);
    updateUI();
}

// Cheat to add all items to inventory
function cheatAddAllItems() {
    // Add one of each normal item
    itemTypes.forEach(item => {
        game.inventory.push({ ...item });
    });
    
    // Add one of each boss item
    bossItemTypes.forEach(item => {
        game.inventory.push({ ...item });
    });
    
    addLogEntry(`CHEAT: Added all available items to inventory!`);
    updateUI();
}

// Cheat to set custom stats
function cheatSetStats(health = null, attack = null, speed = null, dodge = null) {
    if (health !== null) {
        const healthIncrease = health - game.player.stats.health;
        game.player.stats.health = health;
        game.player.maxHp += healthIncrease;
        game.player.currentHp += healthIncrease;
    }
    
    if (attack !== null) game.player.stats.attack = attack;
    if (speed !== null) game.player.stats.speed = speed;
    if (dodge !== null) game.player.stats.dodge = dodge;
    
    addLogEntry(`CHEAT: Set custom stats!`);
    updateUI();
}

// Cheat to advance battle counter (for boss encounters)
function cheatAdvanceBattleCount(count = 9) {
    // Set battle count to be one less than a multiple of 10
    // This means the next battle will be a boss battle
    game.battleCount += count;
    
    addLogEntry(`CHEAT: Advanced battle count to ${game.battleCount} (next battle: ${(game.battleCount + 1) % 10 === 0 ? 'BOSS' : 'normal'})`);
}

// Console instructions
console.log("Cheat functions available:");
console.log("- cheatAddLevels(levels) - Add levels to your character");
console.log("- cheatForceBattle(enemyName, enemyLevel) - Force battle with specific enemy");
console.log("- cheatAddResources(gold, goo, tomatoes) - Add resources");
console.log("- cheatFullHeal() - Fully heal your character");
console.log("- cheatAddAllItems() - Add all items to inventory");
console.log("- cheatSetStats(health, attack, speed, dodge) - Set custom stats");
console.log("- cheatAdvanceBattleCount(count) - Advance battle counter (for boss encounters)");