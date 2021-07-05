USE [Graphic-Solutions];
GO

set identity_insert [OrderDetails] on
insert into [OrderDetails] (Id, OrderId, Quantity, Color, Style, Size) values (4, 4, 3, 'Red', 'Short Sleave', 'Medium');
insert into [OrderDetails] (Id, OrderId, Quantity, Color, Style, Size) values (3, 15, 2, 'Purple', 'Hoodie', 'Large');
set identity_insert [OrderDetails] off