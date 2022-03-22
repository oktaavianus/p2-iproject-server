// TODO : sequelize db:create

//! Table Create
// TODO : sequelize model:create --name User --attributes email:string,password:string,name:string,address:string,phoneNumber:string,role:string
// TODO : sequelize model:create --name Category --attributes name:string
// TODO : sequelize model:create --name Product --attributes name:string,description:string,imgUrl:string,UserId:integer,CategoryId:integer,status:string
// TODO : sequelize model:create --name Cart --attributes ProductId:integer,UserId:integer,status:string
// TODO : sequelize model:create --name HistoryProduct --attributes ProductId:integer,title:string,description:text,updatedBy:string
// TODO : sequelize model:create --name HistoryCart --attributes CartId:integer,title:string,description:text,updatedBy:string

//! Seeding
// TODO : sequelize seed:generate --name Categories-Seed
// TODO : sequelize seed:generate --name Products-Seed

//! sequelize db:migrate
//! sequelize db:seed:all

//! sequelize db:migrate:undo:all