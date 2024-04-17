import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";

/*
colocar una variable para las notificaciones cuando redireciona
colocar una variable para el login y poder llamarlo en varios componentes donde tengo que estar logueado como : mis productos, modificar, header logout
*/

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});
