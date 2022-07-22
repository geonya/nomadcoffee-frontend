import { useCallback } from 'react';
import { SeeCafesQuery } from '../generated/graphql';

interface WithCalculateDistanceProp {
  data?: SeeCafesQuery;
}

export default function useCalculateDistance({
  data,
}: WithCalculateDistanceProp) {
  const calculateDistance = useCallback(
    async (address: string, i: number) => {
      if (!data) return;
      return new Promise(async (resolve) => {
        const ourCoords = {
          latitude: data?.seeCafes![i]?.latitude,
          longitude: data?.seeCafes![i]?.longitude,
        };
        const distance = await getMyLocation().then((position: any) =>
          computeDistance(position.coords, ourCoords)
        );
        resolve(distance);
      });
      async function getMyLocation() {
        // navigator.geolocation 없다면 null을 반환하고 조건식의 결과는 false
        if (navigator.geolocation) {
          //getCurrentPosition(successhandler, errorHandler, option)
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        }
      }
      // 구면 코사인 법칙(Spherical Law of Cosine) 으로 두 위도/경도 지점의 거리를 구함
      // 반환 거리 단위 (km)
      function computeDistance(startCoords: any, destCoords: any) {
        const startLatRads = degreesToRadians(startCoords.latitude);
        const startLongRads = degreesToRadians(startCoords.longitude);
        const destLatRads = degreesToRadians(destCoords.latitude);
        const destLongRads = degreesToRadians(destCoords.longitude);
        const Radius = 6371; //지구의 반경(km)
        const distance =
          Math.acos(
            Math.sin(startLatRads) * Math.sin(destLatRads) +
              Math.cos(startLatRads) *
                Math.cos(destLatRads) *
                Math.cos(startLongRads - destLongRads)
          ) * Radius;
        return distance;
      }
      function degreesToRadians(degrees: any) {
        const radians = (degrees * Math.PI) / 180;
        return radians;
      }
    },
    [data]
  );
  return calculateDistance;
}
