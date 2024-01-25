# my notes :D

## initial read through the `README.md` file
- [ ] Set Up Basic Home Page:
    - [ ] Create a simple home page with minimal styling.
    - [ ] Ensure the home page is SEO-friendly for Google indexing.
        - 💬 if the focus is on SEO, SSR would be good.
- [ ] Develop Lists with Links:
    - [ ] Make a list of spices.
    - [ ] Make a list of blends.
    - [ ] Add functionality to search and filter these lists.
- [ ] Detail Pages (Lists should:)
    - [ ] link to the detail pages for an individual spice (started)
    - [ ] link to the individual blend (bonus, you'll have to extend the API)
        - 💬 this does say bonus so I'm just going to assume this isn't a priority and have this done last maybe?
- [ ] Showcase Front-End Skills:
    - [ ] Add a feature, refactor existing code, or demonstrate excellent styling to showcase your strengths as a Front-End developer.

## Important notes from `README.md`
- **Do not attempt to speed up API calls**. leave setTimeouts in the API file as they are.
    - **You can write your own API endpoint**, again just don't mess with the base API endpoints and timeouts
- **Keep SEO and performance considerations in mind**, as they are key interests for Tomo.
- **Utilize TypeScript**
- **Use whatever resources** *but be prepared to talk about them*.


-----------------------------------------------------------------

I decided to challange myself to use only Next.js’s app approach, avoiding pages.
That's the goal of the newer next js anyway to transition from hybrid / strictly pages to app.
I actually haven't done that before 100% so honestly I tripped up a good bit but it feels good
knowing that I tried my best (and I'm gonna keep working on this. I'm having fun.).
Also knowing that I've been very distracted by family sickness I'd have to say I've done,
and am continuing to do a great job!

As for the design, it said minimal so i went for a brutalist UI astetic.
Something impactful.

I also assumed that this isn't a shop but more of a informational thing.

-----------------------------------------------------------------

1. The beginning!
    - Initialized with GitHub.
    - Installed necessary dependencies.
    - Ensured everything is running smoothly.

2. Home Page Development:
    - Kept the home page simple.
    - Emphasized SEO: Improved HTML structure, added accessibility features.
    - Considering JSON-LD for enhanced SEO.

3. Lists with Links Development:
    - Created basic routing for lists of spices and blends.
    - Developed interfaces for organization.
    - Edited api.ts and added notes.

4. Detail Pages Development:
    - Worked on individual pages for spices and blends.
    - Implemented semantic HTML, loading states, error handling, accessibility, and correct type handling.
    - Updated API for fetching specific items.

5. Search and Filter Functionality:
    - Added a basic search component for spices and blends.
    - Contemplatied a universal search feature in the navigation bar.

6. Some SEO:
    - Focusing on JSON-LD for detailed, structured information.
    - Pair traditional SEO tatics with JSON-LD for comprehensive SEO coverage.
    - Utilize schema-dts for TypeScript definitions of Schema.org vocabulary.
    - Categorized individual spices as articles.

7. Continuing to Fix everything up!

-------

Excuse my informal speech and misspellings from this point on.

* Cool ideas and things I can improve:
    - I need to write more tests. They've definately been put on my backburner and thats not good practice DJ!
    - Components that I should fix up and not be repetitive
        - Individual info pages, I feel that I could totally go back and find similar things and make reusable
        - The Search inputs, I have them as two - `SearchInput.tsx` and `SearchBlendsInput.tsx` which is totally lame. 
        - Add more filters, like by categories (price drop down, etc...)
    - Better / more loading
        - double check all the loadings and make them look better and preform in ALL needed places
    - Double check and test the error states more
    - Make error pages!
    - ANIMATIONS and transitions
        - I'm pretty confident in this and styling so honestly I put this last. I wanted to make sure
        that I learned and grew in a different area in this project and I definitely feel that I have.
    - double check the responsiveness of everything. I know I've missed something.
    - as always, accessibility first!