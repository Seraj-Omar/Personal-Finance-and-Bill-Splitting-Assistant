# StyleAI — Smart Outfit Recommendation Platform 👗✨

**StyleAI** is an AI-powered full-stack web platform that helps users choose and coordinate suitable outfits based on their personal characteristics, cultural preferences, and the occasion.

The platform is designed to simplify the daily outfit selection process by providing clear, practical, and personalized recommendations through an easy-to-use web interface.

---

## Project Overview

Choosing what to wear can be time-consuming and confusing, especially without fashion knowledge.  
StyleAI solves this problem by acting as a **digital personal stylist** that guides users toward appropriate outfit choices.

The system analyzes:
- Body shape
- Skin tone
- Occasion type
- Cultural identity

Based on this information, StyleAI generates outfit suggestions that balance comfort, appearance, and suitability.

---

## Problem Statement

Many users face common challenges such as:
- Difficulty knowing what clothing fits their body type
- Poor color matching with skin tone
- Uncertainty when dressing for different occasions
- Lack of culturally appropriate fashion options

StyleAI provides an automated and personalized solution to these issues.

---

## Solution Approach

StyleAI combines structured user input with predefined styling rules to produce complete outfit suggestions.  
Instead of recommending random clothing items, the platform generates **coordinated looks** that follow basic fashion principles.

---

## Technical Stack

| Layer | Technology | Description |
|------|-----------|-------------|
| Frontend | Next.js (App Router) | User interface and server-side rendering |
| Backend | Next.js API Routes | Business logic and recommendation handling |
| Database | Supabase (PostgreSQL) | User data, profiles, and saved outfits |
| Authentication | Supabase Auth | Secure user login and session handling |
| Styling | Tailwind CSS | Responsive and clean UI design |

---

## Key Features

### 1. User Profile Setup
Users create a personal profile that includes:
- Body shape
- Skin tone
- Cultural preferences
- Basic style preferences

This profile is used to personalize all recommendations.

---

### 2. Occasion-Based Recommendations
Users select an occasion such as:
- Work
- Casual outing
- Formal event
- Cultural or traditional event

The system adjusts its suggestions accordingly.

---


### 3. Recommendation Logic
The recommendation engine uses rule-based logic to:
- Match colors based on skin tone
- Select clothing cuts suitable for body shape
- Filter styles based on occasion and cultural preferences

This approach ensures consistent and understandable results.

---

### 4. Saved Outfits (Lookbook)
Users can:
- Save recommended outfits
- View previous suggestions
- Reuse outfits as inspiration later

---

## System Architecture (Simple Flow)

1. User enters personal and occasion data
2. Frontend sends the data to the backend
3. Backend applies styling rules and filters
4. Supabase retrieves matching clothing data
5. Frontend displays the final outfit suggestion

---

## Future Enhancements

- Image-based outfit analysis
- Machine learning recommendations based on user behavior
- Integration with online fashion stores
- Mobile application support

---

## Project Goal

The goal of StyleAI is to provide a simple, intelligent, and culturally aware styling assistant that helps users feel confident in their clothing choices without needing fashion expertise.

---
