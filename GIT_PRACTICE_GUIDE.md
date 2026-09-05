# 🏴‍☠️ The Grand Line Git & GitHub Mastery Guide

Welcome to the **One Piece Git Quest**! In this guide, you will learn the fundamental skills of Git and GitHub using One Piece pirate lore analogies.

---

## 🗺️ Table of Contents
1. [Core Concepts: Pirate Lore Translation](#-core-concepts-pirate-lore-translation)
2. [Island 1: Foosha Village — Initializing Your Voyage (`git init`, `add`, `commit`)](#island-1-foosha-village--initializing-your-voyage)
3. [Island 2: Loguetown — The Log Pose of History (`git log`, `status`, `diff`)](#island-2-loguetown--the-log-pose-of-history)
4. [Island 3: Water 7 — Building Ships on Branches (`git branch`, `git switch`)](#island-3-water-7--building-ships-on-branches)
5. [Island 4: Marineford — Conquering Merge Conflicts (`git merge`)](#island-4-marineford--conquering-merge-conflicts)
6. [Island 5: Red Line — Connecting to GitHub Remote Den Den Mushi (`git remote`, `push`, `pull`)](#island-5-red-line--connecting-to-github-remote)
7. [Island 6: Egghead — Pull Requests & Free Live Hosting with GitHub Pages](#island-6-egghead--pull-requests--github-pages)
8. [Pirate Secret Techniques (`stash`, `reset`, `revert`)](#-pirate-secret-techniques)

---

## 🧭 Core Concepts: Pirate Lore Translation

| Git / GitHub Concept | One Piece Pirate Analogy | What It Does |
| :--- | :--- | :--- |
| **Working Directory** | Your Pirate Ship Deck | Where you are actively coding/editing files. |
| **Staging Area (`git add`)** | Cargo Hold / Cannon Loading | Preparing specific changes before sealing them in the log. |
| **Commit (`git commit`)** | Captain's Logbook Snapshot | A permanent checkpoint with a unique hash in your adventure. |
| **Branch (`git branch`)** | Alternate Grand Line Route | An isolated line of development to try new ideas safely. |
| **Merge (`git merge`)** | Fleets Reuniting | Combining two branches together into one timeline. |
| **GitHub (Remote)** | The World Government / Pirate News | A central cloud server where everyone shares code. |
| **Push (`git push`)** | Sending News Coo bird | Uploading your local commits to GitHub. |
| **Pull (`git pull`)** | Receiving News Coo paper | Downloading the latest changes from GitHub to your machine. |

---

## Island 1: Foosha Village — Initializing Your Voyage

Open your terminal or PowerShell in this project folder (`one piece proj`).

### Step 1: Configure your Pirate Identity (Run once)
```bash
git config --global user.name "Monkey D. Luffy"
git config --global user.email "luffy@strawhatpirates.com"
```

### Step 2: Initialize Git in this project
```bash
git init
```
> **What happened?** Git created a hidden `.git` folder that tracks all future changes!

### Step 3: Check your Ship Status
```bash
git status
```
> You will see untracked files in red (`index.html`, `style.css`, `app.js`, etc.).

### Step 4: Stage your files (Load Cargo)
```bash
# Stage everything
git add .

# Or stage individual files:
# git add index.html style.css
```

### Step 5: Seal your First Captain's Log (First Commit)
```bash
git commit -m "feat: set sail with Grand Line logbook and Straw Hat crew"
```

---

## Island 2: Loguetown — The Log Pose of History

Now that you have a commit, let's learn how to inspect your voyage history.

### Check the commit log
```bash
# Detailed view
git log

# Compact graphical view (Recommended!)
git log --oneline --graph --decorate
```

### Practice: Make a change and view the diff!
1. Open `data/crew.json` or `index.html`.
2. Change Luffy's bounty or modify a title.
3. Run:
```bash
git diff
```
> `git diff` shows you green lines for additions and red lines for deletions!

---

## Island 3: Water 7 — Building Ships on Branches

Never build risky experiments directly on the `main` branch. Create a feature branch!

### Create and switch to a new branch
```bash
# Create and switch in one command:
git switch -c feature/thousand-sunny-upgrades

# (Older alternative command: git checkout -b feature/thousand-sunny-upgrades)
```

### Verify which branch you are on:
```bash
git branch
```

### Practice Challenge: Add a ship upgrade
1. Open `index.html` and add a new button or comment.
2. Commit it to this branch:
```bash
git add index.html
git commit -m "feat: install Gaon Cannon on Thousand Sunny"
```

### Switch back to `main`:
```bash
git switch main
```
> Notice how the code reverts back to the main timeline! Your changes are safe on the feature branch.

---

## Island 4: Marineford — Conquering Merge Conflicts

A merge conflict happens when two pirates edit the exact same line of code in different ways.

### Step 1: Fast-Forward Merge
To combine your feature branch into `main`:
```bash
git switch main
git merge feature/thousand-sunny-upgrades
```

### Step 2: Practicing a Merge Conflict (The Duel)
Want to practice solving a merge conflict?
1. On `main`, edit line 15 in `index.html` to say `<h1>KING OF THE PIRATES</h1>`.
2. Commit on main: `git commit -am "chore: update title on main"`.
3. Switch to a new branch: `git switch -c duel-branch`.
4. Edit the same line 15 in `index.html` to say `<h1>EMPEROR OF THE SEA</h1>`.
5. Commit on duel branch: `git commit -am "chore: update title on duel-branch"`.
6. Switch back to main: `git switch main`.
7. Try to merge: `git merge duel-branch`.

**Conflict Triggered!** Git will show:
```
<<<<<<< HEAD (Current Change - main)
<h1>KING OF THE PIRATES</h1>
=======
<h1>EMPEROR OF THE SEA</h1>
>>>>>>> duel-branch (Incoming Change)
```
**To resolve:**
- Choose the version you want (or combine both).
- Delete the `<<<<<<<`, `=======`, and `>>>>>>>` markers.
- Save the file and run:
```bash
git add index.html
git commit -m "fix: resolve title conflict between main and duel-branch"
```

---

## Island 5: Red Line — Connecting to GitHub Remote

Now, let's share your One Piece project with the entire world on GitHub!

### Step 1: Create a Repository on GitHub
1. Log in to [GitHub.com](https://github.com).
2. Click the **+** icon in the top right -> **New repository**.
3. Name it: `one-piece-git-quest`.
4. Leave it Public, do **not** check "Initialize with README" (since we already have files).
5. Click **Create repository**.

### Step 2: Link your local repository to GitHub
```bash
# Rename default branch to main (if not already)
git branch -M main

# Link remote URL (replace with YOUR GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/one-piece-git-quest.git

# Push your code
git push -u origin main
```

---

## Island 6: Egghead — Pull Requests & GitHub Pages

### 1. Free Live Website (GitHub Pages)
Make your One Piece bounty web app accessible to anyone on mobile or desktop:
1. Go to your repository on GitHub.
2. Click **Settings** (top tab) -> **Pages** (left sidebar).
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. In 1-2 minutes, GitHub will give you a live URL: `https://YOUR_USERNAME.github.io/one-piece-git-quest/` 🎉

### 2. Pull Request (PR) Workflow
When working in a pirate crew (team):
1. Create a branch: `git switch -c feature/new-recruit-yamato`.
2. Commit your code: `git commit -m "feat: add Yamato to crew roster"`.
3. Push branch to GitHub: `git push origin feature/new-recruit-yamato`.
4. Open GitHub and click **Compare & pull request**.
5. Your teammates review and click **Merge pull request**!

---

## ⚡ Pirate Secret Techniques

### 1. Stashing (Hiding treasure temporarily)
If you need to switch branches quickly without committing unfinished work:
```bash
git stash
# Switch branch, do what you need, then switch back:
git stash pop
```

### 2. Undoing Mistakes Safely (`git revert`)
```bash
# Reverts a specific commit safely by creating a new inverse commit:
git revert <commit-hash>
```

### 3. Discarding Unstaged Changes
```bash
# Discard changes in a specific file:
git restore filename.ext

# Discard all unstaged changes:
git restore .
```

---

## 🏆 Graduation Checklist

- [ ] Run `git init` and make your first commit
- [ ] Create and switch between branches with `git switch -c`
- [ ] Practice a merge conflict and resolve it
- [ ] Push your repository to GitHub
- [ ] Enable GitHub Pages to host your One Piece bounty board live!
