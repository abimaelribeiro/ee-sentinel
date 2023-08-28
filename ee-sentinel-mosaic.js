var dataSet = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterBounds(table)
  .filterDate('2023-07-01', '2023-07-31')
  .filterMetadata('CLOUD_SHADOW_PERCENTAGE', 'less_than', 0.1)
  .select('B4','B3','B2');

Map.centerObject(table)

//calculating the median of all values at each pixel across the stack of all matching bands
var img = ee.Image(dataSet.median()).clip(table);


Map.addLayer(img, { bands: ['B4', 'B3', 'B2'], min: 1285, max: 2736 }, 'Sentinel')

Export.image.toDrive({
    image: img,
    folder: 'ee/mosaico',
    description: 'ee-sentinel-mosaic',
    region: table,
    scale: 10,
    crs: 'EPSG:31980',
    maxPixels: 1e13,
    fileFormat: 'TIFF'
})
