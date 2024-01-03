 <?php
header('Access-Control-Allow-Origin: *');
session_cache_limiter(false);
session_start();
require 'Slim/Slim.php';

$app = new Slim();


require 'app/db_connection.php';
require 'app/install.php';
require 'app/upload.php';
require 'app/company.php';
require 'app/employee.php';
require 'app/autonumber.php';
require 'app/general.php';
require 'app/user.php';
require 'app/product.php'; 
require 'app/supplier.php'; 
require 'app/store.php';

$app->config(array('debug'=>true, 'templates.path' => 'views'));
$app->response()->header('Content-Type', 'application/json;charset=utf-8');

/*** Install ***/
$app->get('/install', 'install');

/*** Upload ***/
$app->post('/UploadImages', 'upload_images'); 
$app->post('/DeleteImages', 'delete_images');


/*** User ***/
$app->get('/user/:uid', 'getUser');  
$app->get('/getUsername/:username', 'getUserName'); 
$app->get('/users', 'getUsers');  
$app->get('/serch_users/:page/:perpage/:txt', 'serchUsers');
$app->post('/createUser', 'createUser');
$app->post('/updateUser', 'updateUser');
$app->post('/deleteUser', 'deleteUser');


/*** Product ***/
$app->get('/product/:id', 'getProduct');
$app->get('/products/:typ/:status', 'getProducts');
$app->get('/serch_roducts/:typ/:status/:page/:perpage/:txt', 'serchProducts');
$app->post('/createProduct', 'createProduct');
$app->post('/updateProduct', 'updateProduct');
$app->post('/deleteProduct', 'deleteProduct');


$app->get('/productSet/:id', 'getProductSet');
$app->get('/productSets', 'getProductSets');
$app->get('/serch_roductSets/:page/:perpage/:txt', 'serchProductSets');
$app->post('/createProductSet', 'createProductSet');
$app->post('/updateProductSet', 'updateProductSet');
$app->post('/deleteProductSet', 'deleteProductSet');
$app->get('/productSetList/:id', 'getProductSetList');



/*** Company ***/
$app->get('/company', 'getCompany');  
$app->post('/updateCompany', 'updateCompany');

/*** Store ***/
$app->get('/tempRecives', 'getTempRecives');
$app->post('/createTempRecive', 'createTempRecive');
$app->post('/updateTempRecive', 'updateTempRecive');
$app->post('/deleteTempRecive', 'deleteTempRecive');
$app->post('/deleteTempRecives', 'deleteTempRecives');
$app->get('/recive/:ino/:id', 'getRecive');
$app->get('/reciveDetail/:ino', 'getReciveDetail');   
$app->get('/reciveListDetail/:pid', 'getReciveListDetail');
$app->get('/reciveList/:pid', 'getReciveList');
$app->get('/reciveProduct/:id', 'getReciveProduct');
$app->get('/recives/:sdat/:edat', 'getRecives');
$app->post('/createRecive', 'createRecive');
$app->post('/createReciveList', 'createReciveList');   
$app->post('/updateReciveList', 'updateReciveList');
$app->get('/tempOuts', 'getTempOuts');
$app->post('/createTempOut', 'createTempOut');
$app->post('/updateTempOut', 'updateTempOut');
$app->post('/deleteTempOut', 'deleteTempOut');
$app->post('/deleteTempOuts', 'deleteTempOuts');
$app->get('/out/:ino', 'getOut');
$app->get('/outDetail/:ino', 'getOutDetail');
$app->get('/outs/:sdat/:edat', 'getOuts');
$app->post('/createOut', 'createOut');
$app->post('/createOutList', 'createOutList');
$app->get('/tempAdjusts', 'getTempAdjusts');
$app->post('/createTempAdjust', 'createTempAdjust');
$app->post('/updateTempAdjust', 'updateTempAdjust');
$app->post('/deleteTempAdjust', 'deleteTempAdjust');
$app->post('/deleteTempAdjusts', 'deleteTempAdjusts');
$app->get('/adjust/:ino', 'getAdjust');
$app->get('/adjustDetail/:ino', 'getAdjustDetail');
$app->get('/adjusts/:sdat/:edat', 'getAdjusts');
$app->post('/createAdjust', 'createAdjust');
$app->post('/createAdjustList', 'createAdjustList');
$app->get('/pickupProducts/:cn', 'getPickupProducts'); 
$app->get('/pickups/:mode/:sdat/:edat', 'getPickups');  
$app->get('/pickupDetail/:ino', 'getPickupDetail');    
$app->get('/pickupDetailHis/:ino', 'getPickupDetailHis');
$app->post('/updatePickup', 'updatePickup');
$app->post('/updatePickupList', 'updatePickupList');



$app->get('/tempPo', 'getTempPo');
$app->post('/createTempPo', 'createTempPo');
$app->post('/updateTempPo', 'updateTempPo');
$app->post('/deleteTempPo', 'deleteTempPo');
$app->post('/deleteTempPos', 'deleteTempPos');

$app->get('/po/:ino', 'getPo');
$app->get('/poDetail/:ino', 'getPoDetail');   
$app->get('/pos/:mode/:sdat/:edat', 'getPos');
$app->post('/createPo', 'createPo');
$app->post('/updatePo', 'updatePo');
$app->post('/createPoList', 'createPoList'); 


$app->get('/tempTranfers/:cn', 'getTempTranfers');
$app->post('/createTempTranfer', 'createTempTranfer');
$app->post('/updateTempTranfer', 'updateTempTranfer');
$app->post('/deleteTempTranfer', 'deleteTempTranfer');
$app->post('/deleteTempTranfers', 'deleteTempTranfers');
$app->get('/tranfer/:ino', 'getTranfer');
$app->get('/tranfers/:sdat/:edat', 'getTranfers');
$app->get('/tranfersProduct/:sdat/:edat', 'getTranfersProduct');  
$app->get('/tranfersBProduct/:sdat/:edat', 'getTranfersBProduct');
$app->post('/createTranfer', 'createTranfer');

$app->post('/createStockCard', 'createStockCard');
$app->get('/stockcards/:id/:year/:month', 'getStockCards');



$app->get('/tempBRecives', 'getTempBRecives');
$app->post('/createTempBRecive', 'createTempBRecive');
$app->post('/updateTempBRecive', 'updateTempBRecive');
$app->post('/deleteTempBRecive', 'deleteTempBRecive');
$app->post('/deleteTempBRecives', 'deleteTempBRecives');
$app->get('/brecive/:ino/:id', 'getBRecive');
$app->get('/breciveDetail/:ino', 'getBReciveDetail');   
$app->get('/breciveListDetail/:pid', 'getBReciveListDetail');
$app->get('/breciveList/:pid', 'getBReciveList');
$app->get('/breciveProduct/:id', 'getBReciveProduct');
$app->get('/brecives/:sdat/:edat', 'getBRecives');
$app->post('/createBRecive', 'createBRecive');
$app->post('/createBReciveList', 'createBReciveList');   
$app->post('/updateBReciveList', 'updateBReciveList');

$app->get('/tempBOuts', 'getTempBOuts');
$app->post('/createTempBOut', 'createTempBOut');
$app->post('/updateTempBOut', 'updateTempBOut');
$app->post('/deleteTempBOut', 'deleteTempBOut');
$app->post('/deleteTempBOuts', 'deleteTempBOuts');
$app->get('/bout/:ino', 'getBOut');
$app->get('/boutDetail/:ino', 'getBOutDetail');
$app->get('/bouts/:sdat/:edat', 'getBOuts');
$app->post('/createBOut', 'createBOut');
$app->post('/createBOutList', 'createBOutList');

$app->get('/tempBAdjusts', 'getTempBAdjusts');
$app->post('/createTempBAdjust', 'createTempBAdjust');
$app->post('/updateTempBAdjust', 'updateTempBAdjust');
$app->post('/deleteTempBAdjust', 'deleteTempBAdjust');
$app->post('/deleteTempBAdjusts', 'deleteTempBAdjusts');
$app->get('/badjust/:ino', 'getBAdjust');
$app->get('/badjustDetail/:ino', 'getBAdjustDetail');
$app->get('/badjusts/:sdat/:edat', 'getBAdjusts');
$app->post('/createBAdjust', 'createBAdjust');
$app->post('/createBAdjustList', 'createBAdjustList');

$app->post('/createBStockCard', 'createBStockCard');
$app->get('/bstockcards/:id/:year/:month', 'getBStockCards');



/*** Autonumber ***/
$app->get('/aTest', 'aTest');
$app->get('/autonumber/:id/:cn', 'getAutonumber');
$app->post('/createAutonumber', 'createAutonumber');
$app->post('/updateAutonumber', 'updateAutonumber');

/*** General ***/
$app->get('/general/:id/:typ', 'getGeneral');
$app->get('/generals/:typ', 'getGenerals');
$app->post('/createGeneral', 'createGeneral');
$app->post('/updateGeneral', 'updateGeneral');
$app->post('/deleteGeneral', 'deleteGeneral');


/*** Supplier ***/
$app->get('/supplier/:id', 'getSupplier');
$app->get('/suppliers/:mode', 'getSuppliers');
$app->get('/serch_suppliers/:mode/:page/:perpage/:txt', 'serchSuppliers');
$app->post('/createSupplier', 'createSupplier');
$app->post('/updateSupplier', 'updateSupplier');
$app->post('/deleteSupplier', 'deleteSupplier');

/*** Employee ***/
$app->get('/employee/:id', 'getEmployee');
$app->get('/employees/:typ/:status', 'getEmployees');
$app->get('/serch_employees/:typ/:status/:page/:perpage/:txt', 'serchEmployees');
$app->post('/createEmployee', 'createEmployee');
$app->post('/updateEmployee', 'updateEmployee');
$app->post('/deleteEmployee', 'deleteEmployee');
$app->get('/employeelocationID/:emp_id', 'getEmployeeLocationID');
$app->get('/employeelocation/:cn', 'getEmployeeLocation');
$app->post('/createEmployeeLocation', 'createEmployeeLocation');
$app->post('/deleteEmployeeLocation', 'deleteEmployeeLocation');  
$app->get('/empImgs/:eid', 'getEmpImgs');
$app->post('/createEmpImg', 'createEmpImg');
$app->post('/deleteEmpImg', 'deleteEmpImg'); 

$app->run();