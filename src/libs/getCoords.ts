export const getCoords = (address: string) => {
  const geocoder = new kakao.maps.services.Geocoder();
  return new Promise<{ latitude: number; longitude: number } | null>(
    (resolve) => {
      geocoder.addressSearch(address, async (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const ourCoords = {
            latitude: coords.getLat(), //위도
            longitude: coords.getLng(), //경도
          };
          resolve(ourCoords);
        }
      });
    }
  );
};
