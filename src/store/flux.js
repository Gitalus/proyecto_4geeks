const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiUrl: `${process.env.REACT_APP_API_URL}`,
            token: null,
            notas: [],
            user_img: "",
            calendar: {},
            categorias: {
                "Enojo": "#FF9AA2",
                "Ansiedad": "#653299",
                "Tristeza": "#346ce7",
                "Felicidad": "#fff27c",
                "Productividad": "#fdb562",
                "Molestia": "#d2fd8d",
                "Cansancio": "#bebebe",
                "Indiferencia": "#eca5ec"
            },
            user_email: "",
            nombre_usuario: "",
            apiUserPic: "https://randomuser.me/api",
            randomUser: ""
        },
        actions: {
            loginUser: async (nombre_usuario, password) => {
                const store = getStore();
                const met = {
                    method: "POST",
                    body: JSON.stringify({
                        nombre_usuario,
                        password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${store.apiUrl}/api/auth`, met);
                const data = await response.json();

                if (data.access_token) {

                    localStorage.setItem("userToken", data.access_token);
                    setStore({ token: data.access_token });
                }
                return response;
            },
            userLogged: async (token) => {
                const store = getStore();
                const met = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                const response = await fetch(`${store.apiUrl}/api/tokencheck`, met);
                if (response.status !== 200) {
                    setStore({ token: null })
                } else {
                    const data = await response.json();
                    localStorage.setItem("userToken", data.access_token);
                    setStore({ token: data.access_token });

                }
            },
            getNotas: async () => {
                const store = getStore();
                const met = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
                }
                const response = await fetch(`${store.apiUrl}/api/profile`, met);
                if (response.status !== 200) {
                    return false
                } else {
                    const data = await response.json();
                    setStore({
                        notas: data.perfil.notas,
                        user_email: data.email,
                        nombre_usuario: data.nombre_usuario,
                        user_img: data.perfil.user_img,
                        calendar: data.perfil.calendario
                    })
                    return true
                }
            },
            postNota: async (titulo, contenido, categoria) => {
                const store = getStore();
                const met = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                    body: JSON.stringify({
                        titulo,
                        contenido,
                        categoria
                    })
                }
                const response = await fetch(`${store.apiUrl}/api/note`, met);
                if (response.status === 200) {
                    store.notas.push({ titulo, contenido, categoria });
                    getActions().getNotas()
                    return true
                } else {
                    return false
                }

            },
            borrarNota: async (id) => {
                const store = getStore();
                const met = {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
                }
                const response = await fetch(`${store.apiUrl}/api/note/${id}`, met);
                if (response.status !== 200) {
                    return false
                } else {
                    const data = await response.json();
                    setStore({ notas: data.perfil.notas })
                    return true
                }
            },
            Logout: () => {
                localStorage.removeItem('userToken');
                localStorage.removeItem('btnSaveStatus');
                setStore({ token: null, notas: [] })
            },
            changeCalendar: (newEntry) => {
                const store = getStore();
                setStore({
                    calendar: {
                        ...store.calendar,
                        ...newEntry
                    }
                })
            },
            getProfilePic: async () => {
                const store = getStore();
                const response = await fetch(`${store.apiUserPic}`);
                const data = await response.json()
                setStore({ randomUser: data.results[0].picture.large })
                localStorage.setItem('randomImage', data.results[0].picture.large)
            },
            saveCalendar: async () => {
                const store = getStore();
                const calendarJson = JSON.stringify(store.calendar);
                const met = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                    body: calendarJson
                }
                const response = await fetch(`${store.apiUrl}/api/calendar`, met);
                if (response.status === 200) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
}

export default getState;



