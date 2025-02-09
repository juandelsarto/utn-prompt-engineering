export const MattressDimensions = {
  SIZE_80x190: "80 x 190 cm",
  SIZE_90x190: "90 x 190 cm",
  SIZE_100x200: "100 x 200 cm",
  SIZE_120x200: "120 x 200 cm",
  SIZE_140x200: "140 x 200 cm",
  SIZE_160x200: "160 x 200 cm",
  SIZE_180x200: "180 x 200 cm",
  SIZE_200x200: "200 x 200 cm",
};

export const MattressMaterialType = {
  FOAM: "Espuma",
  SPRING: "Resorte",
};

export const MattressFoamType = {
  BAJA_DENSIDAD: "Baja densidad",
  MEDIA_DENSIDAD: "Media densidad",
  ALTA_DENSIDAD: "Alta densidad",
  VICOELASTICA: "Vicoelastica",
};

export const MattressSpringType = {
  BONNELL: "Bonnell",
  LFK: "Lfk",
  POCKET: "Pocket enfundado",
};

export const MattressMterialTypeUnified = {
  ...MattressFoamType,
  ...MattressSpringType,
};
