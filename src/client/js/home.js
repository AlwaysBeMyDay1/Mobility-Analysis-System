/*global kakao*/
import "../scss/styles.scss";

class Home {
  API_KEY = "1dbd59baf29415c1ff9bb3d4bfa229f4";
  APP_KEY = "26b4506d2c4f778a27660d8b99da45cf";
  btnDrive = document.querySelector(".drive-btn");

  latitude = document.querySelector(".latitude");
  longitude = document.querySelector(".longitude");
  currentPos = document.querySelector(".current-pos");
  currentSpeed = document.querySelector(".currentSpeed");
  recentRoute = document.querySelector(".recentRoute");
  currentMap = document.getElementById("map");

  constructor() {
    let watchPos = 0;
    const onCurPosOk = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.latitude.innerText = lat;
          this.longitude.innerText = lon;
          this.currentPos.innerText = data.name;
        });
    };

    const onCurPosError = (error) => {
      console.log(error);
    };

    const getCurPos = () => {
      watchPos = navigator.geolocation.watchPosition(onCurPosOk, onCurPosError);
    };
    getCurPos();

    const handleDrive = () => {
      if (this.btnDrive.innerText === "주행 시작") {
        this.btnDrive.innerText = "주행 정지";
        driveInterval = setInterval(getCurPos, 5000);
      } else {
        navigator.geolocation.clearWatch(watchPos);
        this.btnDrive.innerText = "주행 시작";
        clearInterval(driveInterval);
      }
    };

    //draw map
    var mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 10, // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(this.currentMap, mapOption); // 지도를 생성합니다

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
      message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

    this.btnDrive.addEventListener("click", handleDrive);
  }
}

new Home();
