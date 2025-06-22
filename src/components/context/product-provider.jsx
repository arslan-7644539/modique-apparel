"use client";

import { createContext, useState } from "react";

export const ProductsContext = createContext();
export const ProductsProvider = ({ children }) => {
  //  static data for products
  const productData = [
    {
      id: 1,
      title: "Aqua Grace – 3 Piece Chikankari Lawn Coord Set",
      price: "PKR Rs. 5,999",
      originalPrice: "PKR Rs. 6,500.00",
      description:
        "Step into serene elegance with the Aqua Grace coord set. This 3-piece outfit features a breezy chikankari-embroidered lawn shirt paired with a matching lawn trouser and soft inner lining. The pastel aqua hue and intricate detailing offer a perfect blend of comfort and sophistication for your summer wardrobe.",
      fabric: " lawn shirt with inner and trouser",
      images: [
        "/instaArt/art-1.jpg",
        "/instaArt/art-1.jpg",
        "/instaArt/art-1.jpg",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 2,
      title: "Blush Petals – Floral Lawn Maxi Dress",
      price: "PKR Rs.  4,999",
      originalPrice: "PKR Rs. 5,500.00",
      description:
        "Floral Lawn Maxi Step into elegance with Blush Petals, a long-length lawn maxi adorned with soft, delicate floral prints in pastel hues. Made for comfort and effortless charm, this piece brings a touch of femininity and grace to your everyday or occasionwear wardrobe.",
      fabric: " lawn shirt with inner and trouser",
      images: [
        "/instaArt/art-2.jpg",
        "/instaArt/art-2.jpg",
        "/instaArt/art-2.jpg",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 3,
      title: "Crimson Ease – Lawn Coord Set",
      price: "PKR.  4,099",
      originalPrice: "PKR Rs. 4,500.00",
      description:
        "Step into effortless elegance with our Crimson Ease 2-piece coord set, crafted from breathable lawn fabric. Featuring a straight-cut shirt with button-down detailing on the sides and wide-legged trousers, this set is designed for everyday sophistication and comfort. Perfect for casual outings or workwear chic.",
      fabric: " lawn shirt with inner and trouser",
      images: [
        "/article3/art-3-1.jpg",
        "/article3/art-3-2.jpg",
        "/article3/art-3-3.jpg",
        "/article3/art-3-4.jpg",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 4,
      title: "Midnight Panther – 2-Piece/3-Piece Silk Coord Set",
      price: {
        "2_piece": "2_piece: PKR 5,300",
        "3_piece": "3_piece: PKR 6,100",
      },
      originalPrice: {
        "2_piece": "PKR 6,300",
        "3_piece": "PKR 7,100",
      },
      description:
        "Turn heads in the Midnight Panther, a luxurious 2/3-piece silk coord set with a captivating teal and black leopard print. The flowy silhouette and matching silk dupatta add drama and grace — also available with dupatta for a more contemporary, pared-down look.",
      fabric: " lawn shirt with inner and trouser",
      images: [
        "/article4/art-4-1.jpg",
        "/article4/art-4-2.jpg",
        "/article4/art-4-3.jpg",
        "/article4/art-4-4.jpg",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 5,
      title: "Wild Luxe – 3-Piece/2-Piece Silk Coord Set",
      price: {
        "2_piece": "2_piece: PKR 5,300",
        "3_piece": "- 3_piece: PKR 6,100",
      },
      originalPrice: {
        "2_piece": "PKR 6,300",
        "3_piece": "PKR 7,100",
      },
      description:
        "Unleash bold elegance with Wild Luxe, a striking 3-piece silk coord set featuring an all-over leopard print with luxe chain motifs. This set includes a flowy shirt, matching trousers, and a statement silk dupatta, all in a rich mix of golden browns and blacks.Available as both a 3-piece set with a statement silk dupatta and a 2-piece version for a sleeker look, it’s perfect for making a confident style statement — day or night.",
      fabric: " lawn shirt with inner and trouser",
      images: [
        "/article5/art-5-1.jpg",
        "/article5/art-5-2.jpg",
        "/article5/art-5-3.jpg",
        "/article5/art-5-4.jpg",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 6,
      title: "Lemon Mist – 2-Piece Lawn Coord Set",
      price: "PKR 4,099 ",
      originalPrice: "PKR. 4,500.00",

      description:
        "Soft, subtle, and effortlessly chic — Lemon Mist is a pastel yellow 2-piece lawn coord set crafted for everyday elegance. Featuring a relaxed silhouette with wide sleeves and a button-down front, it’s the perfect blend of comfort and minimal style. Ideal for summer days when less is more.",
      fabric: " lawn shirt with inner and trouser",
      images: [
        "/article6/art-6-1.jpg",
        "/article6/art-6-2.jpg",
        "/article6/art-6-3.jpg",
        "/article6/art-6-4.jpg",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 7,
      title: "Urban Hues - 2-Piece Lawn Coord Set",
      price: "Rs 4,499",
      originalPrice: "PKR Rs. 4,500.00",

      description:
        "Urban Hues is a stylish 2-piece lawn coord set featuring abstract brushstroke prints in earthy tones. Made from breathable lawn fabric, it's perfect for everyday wear with a modern, artistic flair.Art meets fashion in the Urban Hues coord set - bold, breezy, and beautifully you.",
      fabric: " lawn shirt with inner and trouser",
      images: [
        "/article7/art-7-1.jpg",
        "/article7/art-7-2.jpg",
        "/article7/art-7-3.jpg",
        "/article7/art-7-4.jpg",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    // {
    //   id: 8,
    //   title: "Urban Hues – 2-Piece Lawn Coord Set",
    //   price: " Rs 4,499 ; 2 piece.",
    //   originalPrice: "PKR Rs. 5,500.00",

    //   description:
    //     "Urban Hues is a stylish 2-piece lawn coord set featuring abstract brushstroke prints in earthy tones. Made from breathable lawn fabric, it’s perfect for everyday wear with a modern, artistic flair.Art meets fashion in the Urban Hues coord set — bold, breezy, and beautifully you.",
    //   images: [
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/504147230_17848508745480581_2698403772490200496_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwNjZ4MTQyMS5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGuTjWdCXkdxRSwslKH0D2vzfTDz_CRaZ8mt44SyzJzGoYAAP74GPOCHpIdilP0XtQ&_nc_ohc=LdbtdsUQ-5gQ7kNvwEzI-VE&_nc_gid=uebjAFrv47LtqZ0hPCnbnQ&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY0ODMyNjQ2MDYwOTc4MTIwNQ%3D%3D.3-ccb7-5&oh=00_AfO2VhjtIUROPWwDS6o0mv73Cyx5uFazn5BsYJBP_Ks4Vw&oe=685D8605&_nc_sid=7a9f4b",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/504147230_17848508745480581_2698403772490200496_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwNjZ4MTQyMS5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGuTjWdCXkdxRSwslKH0D2vzfTDz_CRaZ8mt44SyzJzGoYAAP74GPOCHpIdilP0XtQ&_nc_ohc=LdbtdsUQ-5gQ7kNvwEzI-VE&_nc_gid=uebjAFrv47LtqZ0hPCnbnQ&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY0ODMyNjQ2MDYwOTc4MTIwNQ%3D%3D.3-ccb7-5&oh=00_AfO2VhjtIUROPWwDS6o0mv73Cyx5uFazn5BsYJBP_Ks4Vw&oe=685D8605&_nc_sid=7a9f4b",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/504147230_17848508745480581_2698403772490200496_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwNjZ4MTQyMS5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGuTjWdCXkdxRSwslKH0D2vzfTDz_CRaZ8mt44SyzJzGoYAAP74GPOCHpIdilP0XtQ&_nc_ohc=LdbtdsUQ-5gQ7kNvwEzI-VE&_nc_gid=uebjAFrv47LtqZ0hPCnbnQ&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY0ODMyNjQ2MDYwOTc4MTIwNQ%3D%3D.3-ccb7-5&oh=00_AfO2VhjtIUROPWwDS6o0mv73Cyx5uFazn5BsYJBP_Ks4Vw&oe=685D8605&_nc_sid=7a9f4b",
    //   ],
    //   sizes: ["XS", "S", "M", "L", "XL"],
    // },
    // {
    //   id: 9,
    //   title: "Pastel Bloom – 3 Piece Chikankari Lawn Coord Set",
    //   price: "Rs 5,999 ; 3 piece with inner.",
    //   originalPrice: "PKR Rs. 6,500.00",

    //   description:
    //     "Grace meets comfort in this elegant 3-piece coord set featuring intricate pastel-hued chikankari embroidery on breathable lawn fabric. Comes with a matching inner and wide-leg lawn trousers for a complete, effortlessly chic summer look.",
    //   images: [
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503887614_17848507518480581_5325241266169114479_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwNjZ4MTQyMS5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGuTjWdCXkdxRSwslKH0D2vzfTDz_CRaZ8mt44SyzJzGoYAAP74GPOCHpIdilP0XtQ&_nc_ohc=rHqhsPclcJEQ7kNvwHo6PVa&_nc_gid=uebjAFrv47LtqZ0hPCnbnQ&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY0ODMyMjM1Mzk4MzU2MzE5Mw%3D%3D.3-ccb7-5&oh=00_AfOQmYWWqu2a8oQP58CwYtOns0gKRwdQkhZZGEd3Ie0PYw&oe=685D814D&_nc_sid=7a9f4b",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503887614_17848507518480581_5325241266169114479_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwNjZ4MTQyMS5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGuTjWdCXkdxRSwslKH0D2vzfTDz_CRaZ8mt44SyzJzGoYAAP74GPOCHpIdilP0XtQ&_nc_ohc=rHqhsPclcJEQ7kNvwHo6PVa&_nc_gid=uebjAFrv47LtqZ0hPCnbnQ&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY0ODMyMjM1Mzk4MzU2MzE5Mw%3D%3D.3-ccb7-5&oh=00_AfOQmYWWqu2a8oQP58CwYtOns0gKRwdQkhZZGEd3Ie0PYw&oe=685D814D&_nc_sid=7a9f4b",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503887614_17848507518480581_5325241266169114479_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwNjZ4MTQyMS5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGuTjWdCXkdxRSwslKH0D2vzfTDz_CRaZ8mt44SyzJzGoYAAP74GPOCHpIdilP0XtQ&_nc_ohc=rHqhsPclcJEQ7kNvwHo6PVa&_nc_gid=uebjAFrv47LtqZ0hPCnbnQ&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY0ODMyMjM1Mzk4MzU2MzE5Mw%3D%3D.3-ccb7-5&oh=00_AfOQmYWWqu2a8oQP58CwYtOns0gKRwdQkhZZGEd3Ie0PYw&oe=685D814D&_nc_sid=7a9f4b",
    //   ],
    //   sizes: ["XS", "S", "M", "L", "XL"],
    // },
    // {
    //   id: 10,
    //   title: "Midnight Bloom – Printed Lawn Maxi Dress",
    //   price: " Rs 4,999",
    //   originalPrice: "PKR Rs. 5,500.00",

    //   description:
    //     "Embrace timeless grace with our Midnight Bloom maxi – a long-length lawn dress adorned with a mix of delicate geometric shapes in a rich navy base. Featuring a button-down front and flowing silhouette, it’s the perfect blend of comfort and style for everyday elegance. Lightweight, breathable, and perfect for both casual charm and refined occasions.",
    //   images: [
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503682549_17848505934480581_8470556332092774561_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=o8JPc850jAkQ7kNvwFlrRox&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMxNjA1NTUzOTc2MDcwNw%3D%3D.3-ccb7-5&oh=00_AfPiKiQ1Ap1Gt74JqKO0AjNQ9PuoZ7LZ2ErSL2Awa4HrMA&oe=685D9480&_nc_sid=22de04",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503682549_17848505934480581_8470556332092774561_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=o8JPc850jAkQ7kNvwFlrRox&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMxNjA1NTUzOTc2MDcwNw%3D%3D.3-ccb7-5&oh=00_AfPiKiQ1Ap1Gt74JqKO0AjNQ9PuoZ7LZ2ErSL2Awa4HrMA&oe=685D9480&_nc_sid=22de04",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503682549_17848505934480581_8470556332092774561_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=o8JPc850jAkQ7kNvwFlrRox&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMxNjA1NTUzOTc2MDcwNw%3D%3D.3-ccb7-5&oh=00_AfPiKiQ1Ap1Gt74JqKO0AjNQ9PuoZ7LZ2ErSL2Awa4HrMA&oe=685D9480&_nc_sid=22de04",
    //   ],
    //   sizes: ["XS", "S", "M", "L", "XL"],
    // },
    // {
    //   id: 11,
    //   title: "Blue Willow – Silk 2-Piece/ 3-Piece Coord Set",
    //   price: {
    //     "2_piece": " Rs 5,300",
    //     "3_piece": "Rs 6,100",
    //   },
    //   originalPrice: {
    //     "2_piece": " Rs 6,300",
    //     "3_piece": "Rs 7,100",
    //   },

    //   description:
    //     "Embrace timeless charm in our Blue Willow silk coord set, a graceful blend of delicate florals and classic elegance. This 2/3-piece ensemble is crafted from luxurious silk, featuring a relaxed silhouette with a captivating blue-and-white botanical print. Perfect for casual luxe days or elevated evenings. Available with or without the matching dupatta for added versatility.",
    //   images: [
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/504169942_17848504383480581_4163751297429878061_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=7AbUK-8q0zIQ7kNvwGuHR8v&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMxMjI5NjYxOTUxODUwNg%3D%3D.3-ccb7-5&oh=00_AfOM-1VTmOrFBMUGdG9YKMeqLyv6oXWmK1CiyRpfUBwg-w&oe=685D8B39&_nc_sid=22de04",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/504169942_17848504383480581_4163751297429878061_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=7AbUK-8q0zIQ7kNvwGuHR8v&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMxMjI5NjYxOTUxODUwNg%3D%3D.3-ccb7-5&oh=00_AfOM-1VTmOrFBMUGdG9YKMeqLyv6oXWmK1CiyRpfUBwg-w&oe=685D8B39&_nc_sid=22de04",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/504169942_17848504383480581_4163751297429878061_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=7AbUK-8q0zIQ7kNvwGuHR8v&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMxMjI5NjYxOTUxODUwNg%3D%3D.3-ccb7-5&oh=00_AfOM-1VTmOrFBMUGdG9YKMeqLyv6oXWmK1CiyRpfUBwg-w&oe=685D8B39&_nc_sid=22de04",
    //   ],
    //   sizes: ["XS", "S", "M", "L", "XL"],
    // },
    // {
    //   id: 12,
    //   title: "Monochrome Leaf – Black & White Coord Set",
    //   price: "Rs 4,399 ; 2 piece.",
    //   originalPrice: "Rs 5,399 ; 2 piece.",

    //   description:
    //     "Step into effortless elegance with our Monochrome Leaf 2-piece lawn coord set. Featuring a bold black-and-white leafy print on breathable lawn fabric, this outfit is both striking and comfortable. The relaxed fit with button-down detailing and straight-leg pants makes it perfect for everyday wear with a stylish twist.",
    //   images: [
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503641327_17848501815480581_5690035508200568034_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=n0UNlyuSgxAQ7kNvwG99QC8&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMwMTc2NTI0Mzk2ODQ2MQ%3D%3D.3-ccb7-5&oh=00_AfN8JyImjLKG4bjM38whdTDb8Lb9uFgYZT-FWxCgBhoBJQ&oe=685D7B12&_nc_sid=22de04",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503641327_17848501815480581_5690035508200568034_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=n0UNlyuSgxAQ7kNvwG99QC8&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMwMTc2NTI0Mzk2ODQ2MQ%3D%3D.3-ccb7-5&oh=00_AfN8JyImjLKG4bjM38whdTDb8Lb9uFgYZT-FWxCgBhoBJQ&oe=685D7B12&_nc_sid=22de04",
    //     "https://instagram.flyp2-1.fna.fbcdn.net/v/t51.2885-15/503641327_17848501815480581_5690035508200568034_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.flyp2-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGHS_i3exa_cG9_RE9tVkoMtoydu4C_RbQp3wkp0Xbu3GKPJS0S-Op0Vplt3Pt78cA&_nc_ohc=n0UNlyuSgxAQ7kNvwG99QC8&_nc_gid=qmAcM97DAZu75MuwsXnuew&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY0ODMwMTc2NTI0Mzk2ODQ2MQ%3D%3D.3-ccb7-5&oh=00_AfN8JyImjLKG4bjM38whdTDb8Lb9uFgYZT-FWxCgBhoBJQ&oe=685D7B12&_nc_sid=22de04",
    //   ],
    //   sizes: ["XS", "S", "M", "L", "XL"],
    // },
  ];

  const particulatProduct = (productId) => {
    const product = productData.find((item) => item.id === productId);
    if (product) {
      return product;
    } else {
      console.error("Product not found");
      return null;
    }
  };

  return (
    <ProductsContext.Provider value={{ productData, particulatProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
