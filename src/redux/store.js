import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import searchReducer from "./features/SearchResult";
import notificationReducer from "./features/NotificationSlice";
import cartReducer from "./features/CartSlice";

/*
colocar una variable para las notificaciones cuando redireciona
colocar una variable para el login y poder llamarlo en varios componentes donde tengo que estar logueado como : mis productos, modificar, header logout
*/

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        notification: notificationReducer,
        cart: cartReducer,
    }
});
