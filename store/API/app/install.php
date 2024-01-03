<?php

function install(){	

    //Table Company 
    $sql = "CREATE TABLE IF NOT EXISTS users (
    uid CHAR(50) NOT NULL,
    emp_id CHAR(20) NOT NULL,
    emp_name VARCHAR(200) NOT NULL, 
    username CHAR(20) NOT NULL, 
    password CHAR(50) NOT NULL, 
    auth TEXT,  
    PRIMARY KEY (uid,emp_id,username)
    )";
    $str = createtable($sql);
    echo nl2br('create users... ');     

    //Table Company 
    $sql = "CREATE TABLE IF NOT EXISTS company (
    id CHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL, 
    taxno CHAR(20) NOT NULL, 
    address TEXT,  
    tel CHAR(50), 
    fax CHAR(20), 
    logo VARCHAR(200),
    PRIMARY KEY (id),
    INDEX (taxno,tel)
    )";
    $str = createtable($sql);
    echo nl2br('create company... '); 

    //Table Location 
    $sql = "CREATE TABLE IF NOT EXISTS location (
    id CHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL, 
    sname CHAR(50), 
    address TEXT,  
    tel CHAR(50),     
    com_name VARCHAR(200), 
    com_taxno CHAR(20), 
    com_address TEXT,  
    com_tel CHAR(50), 
    com_fax CHAR(20),  
    wherehouse_id CHAR(20),  
    wherehouse_name VARCHAR(100), 
    status CHAR(1), 
    PRIMARY KEY (id),
    INDEX (wherehouse_id,status)
    )";
    $str = createtable($sql);
    echo nl2br('create location... '); 

    //Table employee_location 
    $sql = "CREATE TABLE IF NOT EXISTS employee_location (
    cn CHAR(50) NOT NULL,
    emp_id CHAR(50) NOT NULL,
    emp_name VARCHAR(200) NOT NULL, 
    PRIMARY KEY (cn,emp_id)
    )";
    $str = createtable($sql);
    echo nl2br('create employee_location... '); 

    //Table Appointment 
    $sql = "CREATE TABLE IF NOT EXISTS appointment (
    id CHAR(50) NOT NULL,
    cn CHAR(50) NOT NULL,
    cname VARCHAR(200) NOT NULL,
    add_date DATETIME,
    app_date DATETIME,
    start_time INT(11),
    end_time INT(11),
    customer_id CHAR(50), 
    customer_name VARCHAR(150) NOT NULL, 
    product_id CHAR(50), 
    product_name VARCHAR(150) NOT NULL, 
    doctor_id CHAR(50), 
    doctor_name VARCHAR(150) NOT NULL, 
    room_id CHAR(50), 
    room_name VARCHAR(150) NOT NULL, 
    mem TEXT(0), 
    status CHAR(20), 
    PRIMARY KEY (id),
    INDEX (cn,app_date,customer_id,doctor_id,product_id,room_id) 
    )";
    $str = createtable($sql);
    echo nl2br('create appointment... ');  

    //Table Wherehouse
    $sql = "CREATE TABLE IF NOT EXISTS wherehouse (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address TEXT,  
    tel CHAR(50), 
    PRIMARY KEY (id)
    )";
    $str = createtable($sql);
    echo nl2br('create wherehouse... '); 


    //Table autonumber
    $sql = "CREATE TABLE IF NOT EXISTS autonumber (
    id CHAR(50) NOT NULL, 
    cn CHAR(50) NOT NULL,   
    name VARCHAR(200), 
    aformat CHAR(20),    
    typ CHAR(1), 
    lnum INT(11), 
    lastID CHAR(30), 
    lastM CHAR(5),
    PRIMARY KEY (id,cn)
    )";
    $str = createtable($sql);
    echo nl2br('create autonumber... ');

    //Table general
    $sql = "CREATE TABLE IF NOT EXISTS general (
    id INT(11) NOT NULL AUTO_INCREMENT,
    typ CHAR(10) NOT NULL,   
    name VARCHAR(200),  
    val1 VARCHAR(100),
    val2 VARCHAR(100), 
    val3 VARCHAR(100), 
    val4 VARCHAR(100), 
    val5 VARCHAR(100),  
    PRIMARY KEY (id,typ,name)
    )";
    $str = createtable($sql);
    echo nl2br('create general... ');

    //Table Supplier 
    $sql = "CREATE TABLE IF NOT EXISTS supplier (
    id CHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL, 
    taxno CHAR(20) NOT NULL, 
    address TEXT,  
    tel CHAR(50), 
    fax CHAR(20), 
    status CHAR(1), 
    PRIMARY KEY (id),
    INDEX (id,taxno,tel,status)
    )";
    $str = createtable($sql);
    echo nl2br('create supplier... ');    

    //Table Employee 
    $sql = "CREATE TABLE IF NOT EXISTS employee (
    id CHAR(50) NOT NULL,
    typ CHAR(1),
    name VARCHAR(200) NOT NULL,
    nname VARCHAR(100),
    address TEXT,  
    tel CHAR(50), 
    email VARCHAR(100), 
    img VARCHAR(200), 
    status CHAR(1),     
    PRIMARY KEY (id),
    INDEX (id,name,email,tel,status)
    )";
    $str = createtable($sql);
    echo nl2br('create employee... ');

    //Table Driver
    $sql = "CREATE TABLE IF NOT EXISTS driver (
    id CHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,  
    tel CHAR(50), 
    pno CHAR(20),    
    address TEXT,   
    status CHAR(1),     
    PRIMARY KEY (id),
    INDEX (id,name,tel,pno,status)
    )";
    $str = createtable($sql);
    echo nl2br('create driver... ');

    //Table Car
    $sql = "CREATE TABLE IF NOT EXISTS car (
    id CHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,  
    expire CHAR(10), 
    warrant CHAR(10), 
    year CHAR(10),    
    mem TEXT,   
    img VARCHAR(200), 
    status CHAR(1),     
    PRIMARY KEY (id),
    INDEX (id,name,expire,status)
    )";
    $str = createtable($sql);
    echo nl2br('create car... ');

    //Table Carhistory
    $sql = "CREATE TABLE IF NOT EXISTS carhistory (
    id CHAR(50) NOT NULL,  
    dat CHAR(10), 
    pnum CHAR(20),    
    mem TEXT, 
    PRIMARY KEY (id,dat),
    INDEX (id,dat)
    )";
    $str = createtable($sql);
    echo nl2br('create car... ');


    //Table Customer 
    $sql = "CREATE TABLE IF NOT EXISTS customer (
    id CHAR(50) NOT NULL,
    cn CHAR(50) NOT NULL,
    cname VARCHAR(200) NOT NULL,
    add_date DATETIME,
    title CHAR(50), 
    fname VARCHAR(100) NOT NULL, 
    lname VARCHAR(1050) NOT NULL, 
    nname VARCHAR(100) NOT NULL, 
    fullname VARCHAR(200), 
    nationality VARCHAR(100), 
    idcard CHAR(20), 
    dob CHAR(15),
    dd CHAR(2),
    dm CHAR(2),
    sex CHAR(10), 
    address VARCHAR(200),
    tm VARCHAR(200), 
    am VARCHAR(200), 
    province VARCHAR(200), 
    zip VARCHAR(200), 
    tel CHAR(50),
    email VARCHAR(200),  
    facebook VARCHAR(200), 
    lineID CHAR(50),
    home CHAR(1), 
    serchText TEXT(0),
    food VARCHAR(100),
    color VARCHAR(100),
    sport VARCHAR(100),
    Hobbies VARCHAR(100),   
    shop VARCHAR(100),
    spa VARCHAR(100), 
    education CHAR(1),
    state CHAR(1),
    mem TEXT(0), 
    status CHAR(1), 
    PRIMARY KEY (id,cn),
    INDEX (id,tel,status,zip) 
    )";
    $str = createtable($sql);
    echo nl2br('create customer... ');  

    //Table images
    $sql = "CREATE TABLE IF NOT EXISTS images (
    id CHAR(50) NOT NULL,
    customer_id CHAR(50) NOT NULL,
    typ CHAR(1) NOT NULL,   
    img VARCHAR(200) NOT NULL,  
    note VARCHAR(100),
    dat DATETIME, 
    PRIMARY KEY (id,customer_id,typ)
    )";
    $str = createtable($sql);
    echo nl2br('create images... ');


    //Table Product
    $sql = "CREATE TABLE IF NOT EXISTS product (
    id CHAR(50) NOT NULL,
    barcode CHAR(50),
    name VARCHAR(200) NOT NULL, 
    group_id CHAR(50),
    group_name VARCHAR(150),  
    typ_id CHAR(50),
    typ_name VARCHAR(150), 
    unit CHAR(50),  
    bprice FLOAT(0), 
    price FLOAT(0),    
    total FLOAT(0), 
    vat CHAR(1),   
    min_qty FLOAT(0),
    com_sale CHAR(1), 
    img VARCHAR(200), 
    st CHAR(1), 
    tr CHAR(1), 
    status CHAR(1), 
    PRIMARY KEY (id),
    INDEX (barcode,group_id,typ_id,status)
    )";
    $str = createtable($sql);
    echo nl2br('create product... ');

    //Table Product
    $sql = "CREATE TABLE IF NOT EXISTS product_total (
    id CHAR(50) NOT NULL,   
    total FLOAT(0),    
    PRIMARY KEY (id)
    )";
    $str = createtable($sql);
    echo nl2br('create product total... ');


    /*** Service ***/
    //Table Service Group
    $sql = "CREATE TABLE IF NOT EXISTS service_group (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL, 
    no INT(11),   
    mode CHAR(1),  
    PRIMARY KEY (id)
    )";
    $str = createtable($sql);
    echo nl2br('create service_group... ');

    //Table Service
    $sql = "CREATE TABLE IF NOT EXISTS service (
    id INT(11) NOT NULL AUTO_INCREMENT,    
    barcode CHAR(50),
    name VARCHAR(200), 
    typ_id INT(11), 
    typ_name VARCHAR(200),
    price FLOAT(0), 
    vat CHAR(1),
    unit CHAR(50),  
    mode CHAR(1),
    dc CHAR(1),
    ec CHAR(1),
    eu CHAR(1),
    du CHAR(1),
    score_dt CHAR(1),
    score_et CHAR(1),
    score_d FLOAT(0),
    score_e FLOAT(0),
    expire_mode CHAR(1),
    start_date DATE,
    expire_date DATE,
    day_mode CHAR(1),
    day_limit FLOAT(0),
    qty_mode CHAR(1),
    qty_limit FLOAT(0),
    cn TEXT,   
    status CHAR(1),  
    PRIMARY KEY (id),
    INDEX (barcode,typ_id,mode)
    )";
    $str = createtable($sql);
    echo nl2br('create service... ');

    //Table Service List
    $sql = "CREATE TABLE IF NOT EXISTS service_list (  
    mode CHAR(1) NOT NULL,
    sid CHAR(20) NOT NULL, 
    pid CHAR(50) NOT NULL, 
    pname VARCHAR(200),  
    typ_id INT(11) NOT NULL,      
    qty FLOAT(0),    
    unit CHAR(50),
    PRIMARY KEY (mode,sid,pid,typ_id)
    )";
    $str = createtable($sql);
    echo nl2br('create service_list...');

    //Table Service Price
    $sql = "CREATE TABLE IF NOT EXISTS service_price (  
    sid CHAR(20) NOT NULL,
    typ_id INT(11) NOT NULL,        
    qty FLOAT(0) NOT NULL, 
    price FLOAT(0),  
    unit CHAR(50),
    PRIMARY KEY (sid,typ_id,qty)
    )";
    $str = createtable($sql);
    echo nl2br('create service_price...');


    /*** Store ***/

    //Table Temp Recive List
    $sql = "CREATE TABLE IF NOT EXISTS temp_recive (  
    cn CHAR(50) NOT NULL, 
    product_id CHAR(50) NOT NULL, 
    product_name VARCHAR(200),       
    qty FLOAT(0),  
    price FLOAT(0), 
    unit CHAR(50), 
    no INT(11) NOT NULL,
    PRIMARY KEY (cn,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create temp_recive...');

    //Table Recive
    $sql = "CREATE TABLE IF NOT EXISTS recive (    
    ino CHAR(50) NOT NULL,  
    cn CHAR(50) NOT NULL, 
    rno CHAR(50), 
    dat DATETIME NOT NULL,
    typ_id CHAR(50) NOT NULL, 
    typ_name VARCHAR(200),  
    location_name VARCHAR(200),
    sup_id CHAR(50) NOT NULL, 
    sup_name VARCHAR(200), 
    mem TEXT,
    emp_id CHAR(50),
    emp_name VARCHAR(200), 
    con_id CHAR(50),
    con_name VARCHAR(200),     
    PRIMARY KEY (ino,cn,dat),
    INDEX (sup_id,typ_id,emp_id,con_name)
    )";
    $str = createtable($sql);
    echo nl2br('create recive... ');

    //Table Recive List
    $sql = "CREATE TABLE IF NOT EXISTS recive_list (  
    ino CHAR(50) NOT NULL,
    cn CHAR(50) NOT NULL,  
    product_id CHAR(50) NOT NULL, 
    product_name VARCHAR(200),  
    qty FLOAT(0),  
    total FLOAT(0), 
    price FLOAT(0), 
    unit CHAR(50), 
    no INT(11),
    PRIMARY KEY (ino,cn,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create recive_list... ');

    //Table Temp Out List
    $sql = "CREATE TABLE IF NOT EXISTS temp_out ( 
    cn CHAR(50) NOT NULL,        
    product_id CHAR(50) NOT NULL, 
    product_name VARCHAR(200), 
    qty FLOAT(0),
    unit CHAR(50), 
    no INT(11) NOT NULL,
    mem TEXT,
    PRIMARY KEY (cn,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create temp_out...');

    //Table Out
    $sql = "CREATE TABLE IF NOT EXISTS outstock ( 
    cn CHAR(50) NOT NULL,   
    ino CHAR(50) NOT NULL,  
    dat DATETIME NOT NULL,
    typ_id CHAR(50) NOT NULL, 
    typ_name VARCHAR(200), 
    location_name VARCHAR(200), 
    sup_name VARCHAR(200), 
    mem TEXT,
    emp_id CHAR(50),
    emp_name VARCHAR(200), 
    con_id CHAR(50),
    con_name VARCHAR(200),     
    PRIMARY KEY (cn,ino,dat),
    INDEX (emp_id,con_id)
    )";
    $str = createtable($sql);
    echo nl2br('create outstock... ');

    //Table Out List
    $sql = "CREATE TABLE IF NOT EXISTS outstock_list (
    cn CHAR(50) NOT NULL,   
    ino CHAR(50) NOT NULL,     
    product_id CHAR(50) NOT NULL, 
    product_name VARCHAR(200),  
    qty FLOAT(0), 
    unit CHAR(50), 
    no INT(11),
    mem TEXT,
    PRIMARY KEY (ino,cn,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create Outstock_list... ');


    //Table Temp Adjust List
    $sql = "CREATE TABLE IF NOT EXISTS temp_adjust (    
    cn CHAR(50) NOT NULL,      
    typ_id CHAR(50) NOT NULL, 
    typ_name VARCHAR(50) , 
    product_id CHAR(50) NOT NULL, 
    product_name VARCHAR(200),   
    qty FLOAT(0),
    unit CHAR(50), 
    no INT(11) NOT NULL,
    mem TEXT,
    PRIMARY KEY (cn,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create temp_adjust...');

    //Table Out
    $sql = "CREATE TABLE IF NOT EXISTS adjust (   
    cn CHAR(50) NOT NULL, 
    ino CHAR(50) NOT NULL,  
    dat DATETIME NOT NULL,  
    location_name VARCHAR(200),
    mem TEXT,
    emp_id CHAR(50),
    emp_name VARCHAR(200), 
    con_id CHAR(50),
    con_name VARCHAR(200), 
    PRIMARY KEY (cn,ino,dat),
    INDEX (emp_id,con_name)
    )";
    $str = createtable($sql);
    echo nl2br('create adjust... ');

    //Table Out List
    $sql = "CREATE TABLE IF NOT EXISTS adjust_list (  
    cn CHAR(50) NOT NULL, 
    ino CHAR(50) NOT NULL, 
    typ_id CHAR(50) NOT NULL, 
    typ_name VARCHAR(50) ,     
    product_id CHAR(50) NOT NULL,  
    product_name VARCHAR(200),  
    qty FLOAT(0),  
    unit CHAR(50), 
    no INT(11),
    mem TEXT,
    PRIMARY KEY (cn,ino,typ_id,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create adjust_list... ');


    //Table Stock Card
    $sql = "CREATE TABLE IF NOT EXISTS stock_card (  
    cn CHAR(20) NOT NULL,
    dat DATETIME NOT NULL,
    ino CHAR(50) NOT NULL,
    rno CHAR(50) NOT NULL,
    typ CHAR(1) NOT NULL,  
    product_id CHAR(50) NOT NULL, 
    product_name VARCHAR(200),  
    qty FLOAT(0),  
    total FLOAT(0), 
    total_price FLOAT(0), 
    unit CHAR(50), 
    note TEXT,
    PRIMARY KEY (cn,dat,ino,rno,typ,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create stock_card... ');

    /*** Order ***/
    //Table Order
    $sql = "CREATE TABLE IF NOT EXISTS orders (    
    ino CHAR(50) NOT NULL,  
    vn CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,
    dat DATETIME,
    customer_id CHAR(50), 
    customer_name VARCHAR(200),     
    payment_mode CHAR(10), 
    payment_plan int(11),     
    emp_id CHAR(50),
    emp_name VARCHAR(200), 
    mem TEXT,
    totalprice FLOAT(0),
    status CHAR(10), 
    PRIMARY KEY (ino),
    INDEX (vn,cn,dat,customer_id,emp_id,status)
    )";
    $str = createtable($sql);
    echo nl2br('create order... ');

    //Table Order List
    $sql = "CREATE TABLE IF NOT EXISTS order_list (  
    ino CHAR(50) NOT NULL,  
    vn CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,  
    customer_id CHAR(50) NOT NULL,
    customer_name VARCHAR(200),
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    ref_id CHAR(50) NOT NULL, 
    id CHAR(50) NOT NULL, 
    name VARCHAR(200),  
    qty FLOAT(0),
    uprice FLOAT(0), 
    discount FLOAT(0), 
    price FLOAT(0),    
    unit CHAR(50),
    payment FLOAT(0),
    mem TEXT, 
    dcom CHAR(1),
    scom CHAR(1),
    vat CHAR(1),
    dis_emp_id CHAR(50),  
    dis_emp_name VARCHAR(100),
    no INT(11),
    emp_id_1 CHAR(50),  
    emp_name_1 VARCHAR(150),
    emp_id_2 CHAR(50),  
    emp_name_2 VARCHAR(150),
    emp_id_3 CHAR(50),  
    emp_name_3 VARCHAR(150),
    emp_id_4 CHAR(50),  
    emp_name_4 VARCHAR(150),
    com_1 INT(11),
    com_2 INT(11),
    com_3 INT(11),
    com_4 INT(11),
    PRIMARY KEY (ino,cn,customer_id,typ_id,ref_id,id)
    )";
    $str = createtable($sql);
    echo nl2br('create order_list... ');

    //Table Temp Order List
    $sql = "CREATE TABLE IF NOT EXISTS temp_order_list (  
    cn CHAR(20) NOT NULL,  
    customer_id CHAR(50) NOT NULL,
    customer_name VARCHAR(200),
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    ref_id CHAR(50) NOT NULL, 
    id CHAR(50) NOT NULL, 
    name VARCHAR(200),  
    qty FLOAT(0),
    uprice FLOAT(0), 
    discount FLOAT(0), 
    price FLOAT(0),    
    unit CHAR(50),
    mem TEXT, 
    dcom CHAR(1),
    scom CHAR(1),
    day_mode CHAR(1),
    day_limit INT(11),
    qty_mode CHAR(1),
    qty_limit INT(11),
    vat CHAR(1),
    dis_emp_id CHAR(50),  
    dis_emp_name VARCHAR(100),
    no INT(11),
    emp_id_1 CHAR(50),  
    emp_name_1 VARCHAR(150),
    emp_id_2 CHAR(50),  
    emp_name_2 VARCHAR(150),
    emp_id_3 CHAR(50),  
    emp_name_3 VARCHAR(150),
    emp_id_4 CHAR(50),  
    emp_name_4 VARCHAR(150),
    com_1 INT(11),
    com_2 INT(11),
    com_3 INT(11),
    com_4 INT(11),
    PRIMARY KEY (cn,customer_id,typ_id,ref_id,id)
    )";
    $str = createtable($sql);
    echo nl2br('create temp_order_list... ');

     
    //Table Pctrec
    $sql = "CREATE TABLE IF NOT EXISTS pctrec (  
    order_id CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,
    vn CHAR(50) NOT NULL,
    dat DATETIME NOT NULL, 
    customer_id CHAR(50) NOT NULL,
    customer_name VARCHAR(200),
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    id CHAR(50) NOT NULL, 
    name VARCHAR(200),  
    qty FLOAT(0),
    total FLOAT(0),
    price FLOAT(0),    
    unit CHAR(50),
    day_mode CHAR(1),
    day_limit INT(11),
    qty_mode CHAR(1),
    qty_limit INT(11), 
    status CHAR(20),
    PRIMARY KEY (order_id,cn,vn,id,dat,customer_id,typ_id),
    INDEX (status)
    )";
    $str = createtable($sql);
    echo nl2br('create pctrec... ');

    //Table Pctlist
    $sql = "CREATE TABLE IF NOT EXISTS pctlist (  
    order_id CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,
    vn CHAR(50) NOT NULL, 
    customer_id CHAR(50) NOT NULL,
    customer_name VARCHAR(200),
    ref_id CHAR(50) NOT NULL,
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    id CHAR(50) NOT NULL, 
    name VARCHAR(200),  
    qty FLOAT(0),    
    total FLOAT(0),  
    unit CHAR(50),
    status CHAR(20),
    PRIMARY KEY (order_id,cn,vn,id,customer_id,ref_id,typ_id),
    INDEX (status)
    )";
    $str = createtable($sql);
    echo nl2br('create pctlist... ');

    //Table Temp pctuse
    $sql = "CREATE TABLE IF NOT EXISTS pctuse ( 
    ucn CHAR(10) NOT NULL,
    uvn CHAR(50) NOT NULL, 
    dat DATETIME NOT NULL,
    order_id CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,
    vn CHAR(50) NOT NULL, 
    customer_id CHAR(50) NOT NULL,
    customer_name VARCHAR(200),
    ref_id CHAR(50) NOT NULL,
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    id CHAR(50) NOT NULL, 
    name VARCHAR(200),  
    qty FLOAT(0),
    no CHAR(10),
    unit CHAR(50),
    note TEXT(0),
    doctor_id CHAR(50),
    doctor_name VARCHAR(200),
    emp_id_1 CHAR(50),
    emp_name_1 VARCHAR(200),
    emp_id_2 CHAR(50),
    emp_name_2 VARCHAR(200),
    PRIMARY KEY (ucn,uvn,dat,order_id,cn,vn,id,ref_id,typ_id),
    INDEX (doctor_id,emp_id_1,emp_id_2)
    )";
    $str = createtable($sql);
    echo nl2br('create pctuse... ');

    //Table Pctuse_product
    $sql = "CREATE TABLE IF NOT EXISTS pctuse_product ( 
    ucn CHAR(10) NOT NULL,
    uvn CHAR(50) NOT NULL, 
    dat DATETIME NOT NULL,
    order_id CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,
    vn CHAR(50) NOT NULL, 
    customer_id CHAR(20) NOT NULL,
    customer_name VARCHAR(200),
    ref_id CHAR(20) NOT NULL,
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    id CHAR(20) NOT NULL, 
    name VARCHAR(200), 
    pid CHAR(20) NOT NULL, 
    pname VARCHAR(200),
    qty FLOAT(0),
    unit CHAR(50),
    PRIMARY KEY (ucn,uvn,dat,order_id,cn,vn,id,ref_id,typ_id,pid)
    )";
    $str = createtable($sql);
    echo nl2br('create pctuse_product... ');

 //Table Temp Pctuse_product
    $sql = "CREATE TABLE IF NOT EXISTS temppctuse_product ( 
    order_id CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,
    vn CHAR(50) NOT NULL, 
    customer_id CHAR(20) NOT NULL,
    customer_name VARCHAR(200),
    ref_id CHAR(20) NOT NULL,
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    id CHAR(20) NOT NULL, 
    name VARCHAR(200), 
    pid CHAR(20) NOT NULL, 
    pname VARCHAR(200),
    qty FLOAT(0),
    unit CHAR(50),
    PRIMARY KEY (order_id,cn,vn,id,ref_id,typ_id,pid)
    )";
    $str = createtable($sql);
    echo nl2br('create temppctuse_product... ');


    //Table Temp pctuse
    $sql = "CREATE TABLE IF NOT EXISTS temp_pctuse (  
    dat DATETIME NOT NULL,
    order_id CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,
    vn CHAR(50) NOT NULL, 
    customer_id CHAR(50) NOT NULL,
    customer_name VARCHAR(200),
    ref_id CHAR(50) NOT NULL,
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    id CHAR(50) NOT NULL, 
    name VARCHAR(200),  
    qty FLOAT(0),
    point FLOAT(0),
    no CHAR(10),
    unit CHAR(50),
    note TEXT(0),
    doctor_id CHAR(50),
    doctor_name VARCHAR(200),
    emp_id_1 CHAR(50),
    emp_name_1 VARCHAR(200),
    emp_id_2 CHAR(50),
    emp_name_2 VARCHAR(200),
    PRIMARY KEY (dat,order_id,cn,vn,id,customer_id,ref_id,typ_id),
    INDEX (doctor_id,emp_id_1,emp_id_2)
    )";
    $str = createtable($sql);
    echo nl2br('create temp_pctuse... ');




    //Table VISITOR    
    $sql = "CREATE TABLE IF NOT EXISTS visits (    
    id CHAR(50) NOT NULL, 
    cn CHAR(20) NOT NULL, 
    mode CHAR(50), 
    dat DATETIME,   
    customer_id CHAR(50), 
    customer_name VARCHAR(200),
    doctor_id CHAR(20), 
    doctor_name VARCHAR(200), 
    note TEXT,  
    tnote TEXT,  
    dinose TEXT,  
    wg CHAR(50), 
    hg CHAR(50),
    hl CHAR(50),
    bl CHAR(50),
    tl CHAR(50),
    img VARCHAR(200),
    status CHAR(10),
    PRIMARY KEY (id),
    INDEX (dat,mode,status)
    )";
    $str = createtable($sql);
    echo nl2br('create Visits... ');


    //Table payments   
    $sql = "CREATE TABLE IF NOT EXISTS payment_plans (    
    order_id CHAR(50) NOT NULL,         
    cn CHAR(20) NOT NULL, 
    no INT(11) NOT NULL,     
    price FLOAT(0), 
    bill_id CHAR(50),   
    status CHAR(10),
    PRIMARY KEY (order_id,cn,no)
    )";
    $str = createtable($sql);
    echo nl2br('create payment plans... ');

    //Table payments   
    $sql = "CREATE TABLE IF NOT EXISTS payment_credit (    
    ino CHAR(50) NOT NULL,    
    cn CHAR(50) NOT NULL,     
    dat DATETIME NOT NULL,   
    mode CHAR(1) NOT NULL, 
    customer_id CHAR(50) NOT NULL,  
    customer_name VARCHAR(150) NOT NULL, 
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(150) NOT NULL,       
    price FLOAT(0),  
    mem VARCHAR(100),
    PRIMARY KEY (ino,cn,dat,mode,customer_id,typ_id)
    )";
    $str = createtable($sql);
    echo nl2br('create payment_credit... ');


    //Table payments   
    $sql = "CREATE TABLE IF NOT EXISTS payments (    
    ino CHAR(50) NOT NULL, 
    vn CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,  
    order_id CHAR(50) NOT NULL,   
    mode CHAR(10) NOT NULL,  
    dat DATETIME,   
    customer_id CHAR(50), 
    customer_name VARCHAR(200),
    total FLOAT(0), 
    recive FLOAT(0), 
    cash FLOAT(0), 
    credit FLOAT(0), 
    trnmoney FLOAT(0), 
    status CHAR(10),
    mem VARCHAR(200),
    PRIMARY KEY (ino,cn),
    INDEX (vn,dat,mode,order_id,status)
    )";
    $str = createtable($sql);
    echo nl2br('create payment... ');

    //Table Order List
    $sql = "CREATE TABLE IF NOT EXISTS payment_list (  
    ino CHAR(50) NOT NULL,  
    dat DATETIME NOT NULL,
    order_id CHAR(50) NOT NULL, 
    vn CHAR(50) NOT NULL,
    cn CHAR(20) NOT NULL,  
    customer_id CHAR(50) NOT NULL,
    customer_name VARCHAR(200),
    typ_id CHAR(50) NOT NULL,  
    typ_name VARCHAR(100),
    ref_id CHAR(50) NOT NULL, 
    id CHAR(50) NOT NULL, 
    name VARCHAR(200),  
    qty FLOAT(0),   
    price FLOAT(0),    
    unit CHAR(50),
    recive FLOAT(0), 
    df_A FLOAT(0), 
    df_B FLOAT(0), 
    df_atotal FLOAT(0),     
    df_btotal FLOAT(0), 
    sum_total FLOAT(0), 
    emp_sum1 FLOAT(0),
    emp_sum2 FLOAT(0),
    emp_sum3 FLOAT(0),
    emp_sum4 FLOAT(0), 
    dcom CHAR(1),
    scom CHAR(1),
    vat CHAR(1),
    dis_emp_id CHAR(50),  
    dis_emp_name VARCHAR(100),
    no INT(11),
    emp_id_1 CHAR(50),  
    emp_name_1 VARCHAR(150),
    emp_id_2 CHAR(50),  
    emp_name_2 VARCHAR(150),
    emp_id_3 CHAR(50),  
    emp_name_3 VARCHAR(150),
    emp_id_4 CHAR(50),  
    emp_name_4 VARCHAR(150),
    com_1 INT(11),
    com_2 INT(11),
    com_3 INT(11),
    com_4 INT(11),
    PRIMARY KEY (ino,order_id,cn,customer_id,typ_id,ref_id,id)
    )";
    $str = createtable($sql);
    echo nl2br('create payment_list... ');


    /***  Purchase Order ***/
    //Table temp purchase order list
    $sql = "CREATE TABLE IF NOT EXISTS temp_purchase (  
    ino CHAR(50) NOT NULL, 
    supplier_id CHAR(50) NOT NULL,
    supplier_name VARCHAR(200),
    product_id CHAR(50) NOT NULL, 
    product_name VARCHAR(200),  
    qty FLOAT(0),  
    price FLOAT(0), 
    totalprice FLOAT(0),
    unit CHAR(50),
    mem TEXT, 
    PRIMARY KEY (ino,supplier_id,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create temp_purchase... ');

    //Table Purchase
    $sql = "CREATE TABLE IF NOT EXISTS purchases (    
    ino CHAR(50) NOT NULL,  
    dat DATETIME,   
    supplier_id CHAR(50), 
    supplier_name VARCHAR(200),    
    emp_id CHAR(50),
    emp_name VARCHAR(200), 
    mem TEXT,
    status CHAR(1),
    PRIMARY KEY (ino),
    INDEX (dat,supplier_id,emp_id,status)
    )";
    $str = createtable($sql);
    echo nl2br('create purchases... ');

    //Table purchase order list
    $sql = "CREATE TABLE IF NOT EXISTS purchas_list (  
    ino CHAR(50) NOT NULL,
    product_id CHAR(50) NOT NULL, 
    product_name VARCHAR(200),  
    qty FLOAT(0),  
    price FLOAT(0), 
    totalprice FLOAT(0),
    unit CHAR(50),
    mem TEXT, 
    PRIMARY KEY (ino,product_id)
    )";
    $str = createtable($sql);
    echo nl2br('create temp_purchase... ');


    /*** QUEUE ***/
    //Table Queue
    $sql = "CREATE TABLE IF NOT EXISTS queue (
    id CHAR(50) NOT NULL,
    cn CHAR(50) NOT NULL,
    dat DATETIME,
    customer_id CHAR(50) NOT NULL,
    customer_name VARCHAR(200), 
    doctor_id CHAR(20), 
    doctor_name VARCHAR(200), 
    note TEXT,  
    tnote TEXT,  
    dinose TEXT,  
    wg CHAR(50), 
    hg CHAR(50),
    hl CHAR(50),
    bl CHAR(50),
    tl CHAR(50),
    img VARCHAR(200),
    state CHAR(1),
    PRIMARY KEY (id),
    INDEX (cn,customer_id)
    )";
    $str = createtable($sql);
    echo nl2br('create queue... '); 

    echo nl2br('Install Database Complete... ');

}