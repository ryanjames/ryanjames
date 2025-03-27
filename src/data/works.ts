import type { TWorks } from "../types"

const works: TWorks = [
  {
    category: "Branding",
    items: [
      {
        title: "Case Study 1",
        slug: "case-study-1",
        description: "Case Study 1 Description",
        images: [
          { src: "/images/case-study-1-image-1.jpg", alt: "Case Study 1 Image 1" },
          { src: "/images/case-study-1-image-2.jpg", alt: "Case Study 1 Image 2" },
        ],
      },
      {
        title: "Case Study 2",
        slug: "case-study-2",
        description: "Case Study 2 Description",
        images: [
          { src: "/images/case-study-2-image-1.jpg", alt: "Case Study 2 Image 1" },
        ],
      },
    ],
  },
  {
    category: "Product Design",
    items: [
      {
        title: "Case Study 3",
        slug: "case-study-3",
        description: "Case Study 1 Description",
        images: [
          { src: "/images/case-study-3-image-1.jpg", alt: "Case Study 3 Image 1" },
          { src: "/images/case-study-3-image-2.jpg", alt: "Case Study 3 Image 2" },
          { src: "/images/case-study-3-image-3.jpg", alt: "Case Study 3 Image 3" },
        ],
      },
      {
        title: "Case Study 4",
        slug: "case-study-4",
        description: "Case Study 4 Description",
        images: [
          { src: "/images/case-study-4-image-1.jpg", alt: "Case Study 4 Image 1" },
          { src: "/images/case-study-4-image-2.jpg", alt: "Case Study 4 Image 2" },
        ],
      },
    ]
  }
]
 
export default works