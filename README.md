## Photoworld

A simple apps that can manage image portfolio, that have admin cms. This app is showing the ease of use [Next.js](https://nextjs.org/) with instagram style modal routing. You can view the demo [here](https://conquera99.now.sh/).

Here some screenshot:
Screenshot 1
![Screenshot 1](https://github.com/conquera99/photoworld/blob/master/screenshot/ss1.gif)

Screenshot 2
![Screenshot 2](https://github.com/conquera99/photoworld/blob/master/screenshot/ss2.gif)

## Features
1. Admin Page
    * Authentication
    * Categories Master
    * Pictures Master
2. Main Page
    * Home
    * Gallery
    * About

## Example Routing With Next.js Router

Example 1:
```
<Link key={name} href={`/Category/[catId]?catId=${name}`} as={`/Category/${name}`}>
    <a className={`category-link ${active}`}>{name}</a>
</Link>
```

Example 2:
```
<Link
    key={item.pic_id}
    href={`/Category/[catId]?catId=${query.catId}&id=${item.pic_id}`}
    as={`/Pictures/${item.pic_id}`}
>
    {content}
</Link>
```

## Dependecies
1. Ant Design React
2. MomentJS
3. NextJS
4. react-cookies
5. react-lazy-load-image-component
6. react-masonry-css

## How To Run
1. Clone this repository
2. Run ```npm install``` on project root
3. Run ```npm run dev``` and go to http://localhost:3000/

### Build
Run ```npm run build```

### Run For Production
Run ```npm run start``` after build

## MIT License

Copyright (c) 2020 Benny

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
