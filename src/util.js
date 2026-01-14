// todo  单个数据转覆盖物
function convertitemToOverlay(geojson) {
  console.log(geojson)

  const type = geojson?.geometry?.type;
  const coordinates = geojson?.geometry?.coordinates;

  if (type === "Polygon") {
    const polygon = new window.BMapGL.Polygon(coordinates[0].map(([lng, lat]) => new window.BMapGL.Point(lng, lat)));
    return polygon;
  } else if (type === "Point") {
    const point = new window.BMapGL.Point(coordinates[0], coordinates[1]);
    const marker = new window.BMapGL.Marker(point);
    return marker;
  }

  return null;

}
//   todo 整个
const convertGeoJSONToOverlay = (geojson) => {
  const features = geojson.features;
  const overlays = [];

  features.forEach(feature => {
    // const coordinates = feature.geometry.coordinates;
    // // todo 判断是圆形还是多边形
    // if(isOverlayCircle(feature)){
    //   const polygon = new window.BMapGL.Polygon(coordinates.map(item => new window.BMapGL.Point(item[0], item[1])));
    //   overlays.push(polygon);
    // }else{ //todo 多边形
    //   const polygon = new window.BMapGL.Polygon(coordinates[0].map(item => new window.BMapGL.Point(item[0], item[1])));
    //   overlays.push(polygon);
    // }

    const type = feature.geometry.type;
    const coordinates = feature.geometry.coordinates;

    if (type === "Polygon") {

      if (isOverlayCircle(feature)) { //todo 圆形
        const polygon = new window.BMapGL.Polygon(coordinates.map(item => new window.BMapGL.Point(item[0], item[1])));
        overlays.push(polygon);
      } else { //todo 多边形
        const polygon = new window.BMapGL.Polygon(coordinates[0].map(item => new window.BMapGL.Point(item[0], item[1])));
        overlays.push(polygon);
      }
    } else if (type === "Point") {
      const point = new window.BMapGL.Point(coordinates[0], coordinates[1]);
      const marker = new window.BMapGL.Marker(point);
      overlays.push(marker);



    }
  });
  console.log(overlays)

  return overlays;
}
// todo 判断圆形
const isOverlayCircle = (overlay) => {
  const overlayType = overlay.toString();
  return overlayType.includes("Circle");
}



/* 递归拍平菜单，给 antd 用 */
const flatten = (list, parentKeys = []) => {
  return list.reduce((arr, item) => {
    const keys = [...parentKeys, item.key];
    if (item.children?.length) {
      arr.push({ ...item, children: undefined }); // 父节点自己也占一行
      arr.push(...flatten(item.children, keys));
    } else {
      arr.push({ ...item, parentKeys: keys });
    }
    return arr;
  }, []);
}
export {
  convertitemToOverlay,
  flatten,
  convertGeoJSONToOverlay
}
