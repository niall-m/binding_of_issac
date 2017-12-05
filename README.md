# Binding Of Issac

### Background and Overview

The original game, The Binding of Isaac, is a dungeon crawl where the player tries to fight monsters and survive for as long as possible. My clone, Binding of Issac, will attempt to recreate a similar, albeit simpler gameplay, which will consist of a single screen with the game canvas, player score, controlls, and links to github & linkedIn.

### Functionality & MVPs

Users will be able to:
- [ ] Move their hero using the keyboard arrow keys
- [ ] Collect items by colliding the hero into said items
- [ ] Combat enemy monsters by shooting projectiles with space bar
- [ ] Start, pause and restart game

### Wireframes

This app will consist of a single screen with the simulation canvas, player controls, player score, and nav links to the Github and my LinkedIn.  

Player controls along the left side will include Pause (P), Action (space bar), and directional move (left, right, up, down arrow keys).

On the top near the left there will be an a toggle music/sound button.

![wireframes](https://github.com/niall-m/binding_of_issac/blob/master/images/binding_of_issac_wireframe.png)

### Architecture and Technology

This project will be implemented with the following:

* Vanilla JavaScript
* `HTML5 Canvas` for DOM manipulation and rendering
* `Webpack` to bundle files together

### Implementation Timeline

**Weekend:**
- [ ] Research Canvas

**Monday:**
- [ ] Render the canvas
- [ ] Render user-controlled object (hero) on canvas

**Tuesday:**
- [ ] Create collectable objects (coins)
- [ ] Create movement functionality for hero and monsters

**Wednesday:**
- [ ] Hero interaction/collision with collectables
- [ ] Create monsters to that can kill the hero
- [ ] Sound effects/music with toggle mute button

**Thursday:**
- [ ] Weaponize the hero to combat said monsters
- [ ] Counter to keep score
- [ ] CSS and styling of page and canvas
- [ ] Start and pause features

### Bonus Features

Given time, I would like to add the following:
- [ ] Add multiple levels with different terrains and monsters
- [ ] Enemy boss level
- [ ] Collectable weapon upgrades
- [ ] Secret easter eggs
