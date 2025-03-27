import type { TWorks } from "../types"

const works: TWorks = [
  {
    category: "Product Design",
    items: [
      {
        title: "Monorail",
        slug: "monorail",
        description:
          "Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna.",
        images: [
          {
            src: "/images/case-study-image.jpg",
            alt: "Case Study 1 Image 1",
          },
        ],
      },
      {
        title: "Case Study 2",
        slug: "case-study-2",
        description: "Case Study 2 Description",
        images: [
          {
            src: "/images/case-study-image.jpg",
            alt: "Case Study 2 Image 1",
          },
          {
            src: "/images/case-study-image.jpg",
            alt: "Case Study 2 Image 2",
          },
        ],
      },
    ],
  },
  {
    category: "Branding",
    items: [
      {
        title: "Case Study 3",
        slug: "case-study-3",
        description: "Case Study 3 Description",
        images: [
          {
            src: "/images/case-study-image.jpg",
            alt: "Case Study 3 Image 1",
          },
          {
            src: "/images/case-study-image.jpg",
            alt: "Case Study 3 Image 2",
          },
        ],
      },
      {
        title: "Case Study 4",
        slug: "case-study-4",
        description: "Case Study 4 Description",
        images: [
          {
            src: "/images/case-study-image.jpg",
            alt: "Case Study 4 Image 1",
          },
        ],
      },
    ],
  },
];
 
export default works