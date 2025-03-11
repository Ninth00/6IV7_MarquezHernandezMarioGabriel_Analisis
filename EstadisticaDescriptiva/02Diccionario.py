import pandas as pd
#crear una función que se encargue de recibir un diccionario de la notas de los estudiantes que van a reprobar y obtener su min, Max, media, y desviación estándar 

def estadisticas_notas(notas):
    notas = pd.Series(notas)
    estadística = pd.Series([notas.min(), notas.max(), notas.mean(), notas.std()], index = ['Min', 'Max', 'Media', 'Desviación estandar'])
    return estadística

def aprobados(notas):
    notas = pd.Series(notas)
    return notas[notas >= 6].sort_values(ascending=False)

notas = {'Juan':9,'Juanita':5.9,'Pedro':8.2,'Rosalba':6.9,'Federico':4.5,'Alberto': 7.5}

print(estadisticas_notas(notas))

print(aprobados(notas))