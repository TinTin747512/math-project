/* =========================================
   สร้างกล่องสินค้า
========================================= */

function createProductBox() {

    const product = document.createElement("div");

    product.className = "product-area";

    product.innerHTML = `

        <!-- ปุ่มลบกล่องสินค้า -->

        <button
            class="delete-btn"
            onclick="deleteProduct(this)"
        >
            ×
        </button>


        <!-- ชื่อสินค้า -->

        <input
            type="text"
            class="product-name-input"
            value="ชื่อสินค้า"
            onclick="this.select()"
        >


        <!-- ราคา -->

        <div class="field">

            <label>
                ราคา
            </label>

            <div class="input-wrap">

                <input
                    type="number"
                    class="price"
                    min="0"
                    step="any"
                >

                <span class="input-unit">
                    บาท
                </span>

            </div>

        </div>


        <!-- จำนวน -->

        <div class="field">

            <label>
                จำนวน
                <span style="color:#888;">
                    (ที่ต้องการ)
                </span>
            </label>

            <div class="input-wrap">

                <input
                    type="number"
                    class="quantity"
                    min="0"
                    step="any"
                >

                <span class="input-unit">
                    หน่วย
                </span>

            </div>

        </div>


        <!-- โปรโมชั่น -->

        <div class="field">

            <label>
                โปรโมชั่น
            </label>

            <div class="input-wrap">

                <select class="promotion-select">

                    <option value="x">
                        x
                    </option>

                    <option value="y">
                        y
                    </option>

                    <option value="z">
                        z
                    </option>

                </select>

            </div>

        </div>

    `;

    return product;
}


/* =========================================
   สร้าง "กล่องสีขาว"
========================================= */

function createGroup() {

    const group = document.createElement("div");

    group.className = "calculator-box";


    /* กล่องสินค้าแรก */

    group.appendChild(
        createProductBox()
    );


    /* =====================================
       ปุ่ม +เพิ่มสินค้า
       อยู่ในกล่องสีขาว
    ===================================== */

    const addButton =
        document.createElement("button");

    addButton.className =
        "add-product-btn";

    addButton.textContent =
        "+เพิ่มสินค้า";


    addButton.onclick = function () {

        /*
         เพิ่มกล่องสีเทา
         เข้าไปในกล่องสีขาวเดียวกัน
        */

        group.insertBefore(
            createProductBox(),
            addButton
        );

    };


    group.appendChild(addButton);


    /* =====================================
       ปุ่ม เป็ด
    ===================================== */

    const calculateButton =
        document.createElement("button");

    calculateButton.className =
        "calculate-btn";

    calculateButton.textContent =
        "เป็ด";


    calculateButton.onclick =
        function () {

            calculateGroup(group);

        };


    group.appendChild(
        calculateButton
    );


    /* =====================================
       พื้นที่ผลลัพธ์
    ===================================== */

    const results =
        document.createElement("div");

    results.className =
        "results";

    group.appendChild(
        results
    );


    return group;
}


/* =========================================
   เพิ่มกล่องสีขาวใหม่
========================================= */

function addGroup() {

    const groups =
        document.getElementById("groups");


    const group =
        createGroup();


    groups.appendChild(group);

}


/* =========================================
   ลบกล่องสีเทา
========================================= */

function deleteProduct(button) {

    const product =
        button.closest(".product-area");

    if (product) {
        product.remove();
    }

}


/* =========================================
   คำนวณสินค้าภายในกล่องสีขาว
========================================= */

function calculateGroup(group) {

    const products =
        group.querySelectorAll(".product-area");


    let data = [];


    /* อ่านข้อมูล */

    products.forEach(
        function (product, index) {

            const name =
                product
                    .querySelector(".product-name-input")
                    .value
                    .trim()
                || "ชื่อสินค้า";


            const price =
                parseFloat(
                    product
                        .querySelector(".price")
                        .value
                );


            const quantity =
                parseFloat(
                    product
                        .querySelector(".quantity")
                        .value
                );


            const promotion =
                product
                    .querySelector(".promotion-select")
                    .value;


            /*
             ถ้าราคาและจำนวนถูกกรอกแล้ว
            */

            if (
                !isNaN(price) &&
                !isNaN(quantity)
            ) {

                const total =
                    price * quantity;


                data.push({

                    index: index,

                    name: name,

                    price: price,

                    quantity: quantity,

                    promotion: promotion,

                    total: total

                });

            }

        }
    );


    /* =====================================
       เรียงราคาถูก → แพง
    ===================================== */

    data.sort(
        function (a, b) {

            return a.total - b.total;

        }
    );


    /* ล้างผลลัพธ์เดิม */

    const results =
        group.querySelector(".results");

    results.innerHTML = "";


    if (data.length === 0) {

        results.innerHTML = `

            <div class="result-box">

                <div class="result-text">
                    กรุณากรอกราคาและจำนวน
                </div>

            </div>

        `;

        return;
    }


    /* =====================================
       สร้างผลลัพธ์
    ===================================== */

    data.forEach(
        function (item, rank) {

            let className = "other";

            let medal = "";

            let bookmark = "";


            /*
             อันดับ 1
            */

            if (rank === 0) {

                className = "first";

                medal = "🥇";

                bookmark = `
                    <div class="bookmark"></div>
                `;

            }


            /*
             อันดับ 2
            */

            else if (rank === 1) {

                className = "second";

                medal = "🥈";

                /*
                 ไม่ใส่ bookmark
                */

            }


            /*
             อันดับ 3+
            */

            else {

                className = "other";

            }


            const result =
                document.createElement("div");


            result.className =
                "result-box " + className;


            result.innerHTML = `

                ${bookmark}

                <div class="result-text">

                    {item.index + 1}
                    :

                    <span class="result-name">
                        ${escapeHTML(item.name)}
                    </span>

                    <span class="medal">
                        ${medal}
                    </span>

                    <br>

                    <span class="result-price">

                        ${formatNumber(item.total)}

                        บาท

                    </span>

                </div>

            `;


            results.appendChild(result);

        }
    );

}


/* =========================================
   ป้องกัน HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


/* =========================================
   Format ตัวเลข
========================================= */

function formatNumber(number) {

    return number.toLocaleString(
        "th-TH",
        {
            maximumFractionDigits: 2
        }
    );

}


/* =========================================
   เปิดเว็บมาให้มี 1 กล่องสีขาว
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        addGroup();

    }
);
