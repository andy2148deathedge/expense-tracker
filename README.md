# expense-tracker
AC 老爸私房錢(家庭記帳本) 專案

1. 首頁會列出所有的支出項目及累計總金額
2. 首頁可以使用下拉是選單選擇支出類型，會馬上將同類型的支出項目給篩選呈現出來，總金額也會變為該類型總金額
3. 可以選擇編輯按鈕進入該支出項目編輯頁面、或是刪除整筆支出項目
4. 編輯頁面可以更改該項支出的內容及分類等

### 概覽:

![login image](補   )
![login image](補   ) 

### 開發環境及套件

| Package            | Version  |
| ------------------ | -------- |
| Node.js            | v14.16.0 |
| Npm                | 6.14.11  |
| Express            | 4.17.1   |
| Express-handlebars | 5.3.4    |
| handlebars-helpers | 0.10.0   |
| Nodemon            | 2.0.13   |
| Mongoose           | 6.0.11   |
| MongoDB           | 4.2.17    |

### 安裝方式:

1.本地directory clone 專案:

```bash
$ git clone https://github.com/kusasen/expense-tracker.git
```

2. 安裝 node module

```bash
$ cd expense-tracker
$ npm install
```

3. 建立 DB 種子資料

需在 local 建立 MongoDB 並且使用預設 port 27017。

```bash
$ npm run seed
```

4. Server 啟動
```bash
$ npm run dev
```

5.瀏覽器瀏覽，前往: http://localhost:3000