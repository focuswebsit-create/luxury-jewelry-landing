# Next messages to send after Claude completes MVP

## 1. Visual review
```
Review the rendered website side-by-side with preview/index.html and the written creative brief. Identify the 10 most important visual or animation issues, prioritize them by user impact, implement the improvements, and provide fresh desktop/mobile screenshots. Make sure the boxes feel physically connected to their lids and the products are clearly visible.
```

## 2. Mobile polish
```
Run an end-to-end mobile interaction audit at 360, 390 and 430px viewport widths. Test all three boxes, rapid switching, scrolling, focus, and CTA. Fix clipping, horizontal overflow, slow animation and hit-target issues. Add regressions to the automated smoke tests.
```

## 3. Replace placeholders with assets
```
Create an asset adapter that allows us to swap every placeholder gemstone/watch/ring illustration for licensed transparent product images or suitable GLB assets. Keep the opening interactions stable and document exact asset sizing, angle, crop and formats. Do not invent or scrape branded product photos.
```

## 4. Preview before merge
```
Please push the completed feature branch, open a PR into main, list all successful checks and outstanding limitations, and give me Vercel preview instructions. Do not merge into main without my approval.
```
