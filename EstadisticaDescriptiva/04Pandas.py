import pandas as pd
import matplotlib.pyplot as plt
df = pd.read_csv('./housing.csv')

#mostrar las primeras cinco filas
print(df.head())

#Las últimas 5 filas

print(df.tail())

#fila en específico
print(df.iloc[7])

#mostrar una columna por su nombre
print(df["ocean_proximity"])

#obtener la media de la columna de total de cuartos
mediacuartos= df['total_rooms'].mean()
print('Media de los cuartos: ' ,mediacuartos)

#Obtener la mediana de la columna population
medianapopularidad = df['population'].median()
print('Mediana popularidad: ', medianapopularidad)

#Obtener la desciacion estandar
stdage = df['housing_median_age'].std()
print('Desciación Estandar de años: ', stdage)

#para poder filtar
filtrodeloceano = df[df['ocean_proximity']=='ISLAND']
print('Filtro de proximidad del oceano: ', filtrodeloceano)

#Vamos a crear un gráfico de dispersion entre los registros de la proximidad del oceano vs los precios
plt.scatter(df['ocean_proximity'][:10],df['median_house_value'][:10])

#Hay que definir a x y a y
plt.xlabel('Proximidad')
plt.ylabel('Precio')

#Título del gráfico
plt.title('Gráfico de Dispersion de Proximidad al oceano vs Precio')
plt.show()

print('Tipo de dato df', type(df))