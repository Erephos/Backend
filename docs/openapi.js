module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API para saludar y calcular edad',
    },
    paths: {
        "/api/saludo": {
            get: {
                tags: ["General"],
                summary: 'Devuelve un saludo',
                responses: { 
                    200: {
                        description: 'Saludo devuelto correctamente',
                        content: {
                            "application/json": {
                                example: {
                                    mensaje: 'Hola desde mi API'
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/yo": {
            get: {
                tags: ["Ejercicios"], 
                summary: 'Devuelve nombre y carrera',
                responses: {
                    200: {
                        description: 'Presentación correcta',
                        content: {
                            "application/json": {
                                example: {
                                    nombre: "Edgar Angulo",
                                    carrera: "Ing. de software"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/edad/{anio}": {
            get: {
                tags: ["Ejercicios"],
                summary: 'Devuelve edad de una persona según su año de nacimiento',
                parameters: [
                    {
                        name: "anio",
                        in: "path",
                        required: true,
                        description: "Año de nacimiento de la persona",
                        schema: {
                            type: "integer"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: 'Cálculo de edad exitoso',
                        content: {
                            "application/json": {
                                example: {
                                    anionacimiento: 2007,
                                    edad: 19
                                }
                            }
                        }
                    },
                    400: {
                        description: 'Año inválido (fuera de rango o no es un número)',
                        content: {
                            "application/json": {
                                example: {
                                    error: "Año invalido"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};