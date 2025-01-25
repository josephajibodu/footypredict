[![deploy](https://github.com/josephajibodu/footypredict/actions/workflows/build-production.yml/badge.svg?branch=main)](https://github.com/josephajibodu/footypredict/actions/workflows/build-production.yml)

# FootyPredict

For every model, I decorate the docs with the properties it has, this way the IDE gives the necessary autocomplete, 
hence a better developer experience. Little work for a bigger gain. So as you work on this project, when you add more
properties to any model, add it to the docs at the top.

Do well to format your code at intervals with composer link

## Core Features

1. [ ] Landing Page
2. [ ] How to Play
3. [ ] FAQs
4. [ ] Terms
5. [ ] Privacy Policy
6. [ ] Responsible Gaming

**Referral**
1. [ ] Invites and Reward
2. [ ] Copy Code

**Settings**
1. [ ] Profile Details
2. [ ] KYC
3. [ ] Update Password
4. [ ] Contact Us
5. [ ] How to Play
6. [ ] FAQ
7. [ ] Privacy
8. [ ] Terms

**Bet History**
1. [ ] Pending
2. [ ] Active
3. [ ] Completed
4. [ ] Ability to paste booking code ?????

**Market**
2. [ ] Past Games and outcomes

**ADMIN**
1. [ ] Dashboard

# Deployment must include these:

php artisan filament:optimize
php artisan filament:optimize-clear // for the opposite

** Enabling OPcache: Please use a search engine to find the relevant OPcache setup instructions for your environment.
  
php artisan optimize

# Bet Strategy

2 matches - x3
3 matches - x5
4 matches - x10
5 matches - x20
6 matches - x30
7 matches - x50
8 matches - x100

flex entry for 8 matches
get 8 correct - x50
get 7 correct - x3
get 6 correct - x1.2

flex entry for 7 matches
get 7 correct - x30
get 6 correct - x2.5
get 5 correct - x0.5

flex entry for 6 matches
get 6 correct - x20
get 5 correct - x2
get 4 correct - x0.4

flex entry for 5 matches
get 5 correct - x10
get 4 correct - x1.5
get 3 correct - x0.25

flex entry for 4 matches
get 4 correct - x5
get 3 correct - x1.5

flex entry for 3 matches
get 4 correct - x2.25
get 3 correct - x1.25

flex not allowed entry for 2 matches
