export const getCoordsByRegiao = (idRegiao: number) => {
  const coords: Record<number, { lat: number; lng: number }> = {
    1: { lat: -19.9167, lng: -43.9345 }, // Belo Horizonte
    2: { lat: -21.2436, lng: -45.0014 }, // Lavras
    3: { lat: -18.9186, lng: -48.2772 }, // Uberlândia
  };

  return coords[idRegiao] || { lat: -21.0, lng: -45.0 }; // Fallback caso não ache
};