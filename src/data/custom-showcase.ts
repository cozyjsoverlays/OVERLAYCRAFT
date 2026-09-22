/**
 * Real content for the /commissions page, harvested from the live custom
 * listing (VectorKingStudio #4499837996): the full photo gallery, the preview
 * video, the aggregate rating and real buyer reviews. Refreshed by hand from
 * the listing - no price is stored here on purpose; commissions are presented
 * as "from $100" only.
 */

export interface CommissionReview {
  author: string;
  rating: number;
  date: string;
  text: string;
}

export const CUSTOM_SHOWCASE = {
  listingUrl:
    "https://vectorkingstudio.etsy.com/listing/4499837996/custom-twitch-overlay-stream-package",
  video: "https://v.etsystatic.com/e/videos/9e8b/5e9bb042-53e9-4969-b40f-134ca94dceeb/vid_v1.mp4",
  /** Full-resolution listing photos (Etsy CDN, il_fullxfull). */
  gallery: [
    "https://i.etsystatic.com/23257274/r/il/162867/7986485866/il_fullxfull.7986485866_8s5v.jpg",
    "https://i.etsystatic.com/23257274/r/il/a2910e/8035180469/il_fullxfull.8035180469_ejtj.jpg",
    "https://i.etsystatic.com/23257274/r/il/6a271a/8034546609/il_fullxfull.8034546609_23u0.jpg",
    "https://i.etsystatic.com/23257274/r/il/627a20/8534770206/il_fullxfull.8534770206_m9tt.jpg",
    "https://i.etsystatic.com/23257274/r/il/233c79/8582644789/il_fullxfull.8582644789_idhj.jpg",
    "https://i.etsystatic.com/23257274/r/il/7a69db/8035116153/il_fullxfull.8035116153_mox6.jpg",
    "https://i.etsystatic.com/23257274/r/il/2278e0/7986608626/il_fullxfull.7986608626_smz3.jpg",
    "https://i.etsystatic.com/23257274/r/il/b58278/8035090013/il_fullxfull.8035090013_c76p.jpg",
    "https://i.etsystatic.com/23257274/r/il/58fbfc/7986607612/il_fullxfull.7986607612_mk18.jpg",
    "https://i.etsystatic.com/23257274/r/il/7ebebc/8034554611/il_fullxfull.8034554611_98ts.jpg",
    "https://i.etsystatic.com/23257274/r/il/838d37/8534781684/il_fullxfull.8534781684_fxya.jpg",
    "https://i.etsystatic.com/23257274/r/il/cadfe9/8582650661/il_fullxfull.8582650661_hek4.jpg",
    "https://i.etsystatic.com/23257274/r/il/c8bd15/7986617224/il_fullxfull.7986617224_9yul.jpg",
    "https://i.etsystatic.com/23257274/r/il/99c377/7986616500/il_fullxfull.7986616500_map2.jpg",
  ],
  aggregate: { average: 5.0, count: 8, recommend: 100 },
  reviews: [
    {
      author: "Richard",
      rating: 5,
      date: "Sep 18, 2026",
      text: "Very fast and responding and understands what I wanted!",
    },
    {
      author: "Marissa",
      rating: 5,
      date: "Aug 22, 2026",
      text: "Amazing amazing amazing!! I love it so much, and the whole process from start to finish couldn't have gone any easier. Recommend this seller a million percent!!",
    },
    {
      author: "Richard",
      rating: 5,
      date: "Jul 30, 2026",
      text: "Great communication and super friendly! The product was exactly what I wanted, I will reach out again for more overlays in the future!",
    },
    {
      author: "LunaChan",
      rating: 5,
      date: "Jul 23, 2026",
      text: "Amazing work and an amazing artist!! I received the product in time, even before the actual delivery date. The planning was great, every detail was addressed, and every change was implemented perfectly. I'm so happy that I found VectorKingStudio and for sure I will order again!",
    },
  ] as CommissionReview[],
};
