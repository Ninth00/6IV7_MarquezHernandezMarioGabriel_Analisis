import numpy as np
import pandas as pd
from scipy.spatial import distance

#Definimos las coordenadas de nuestro sistema de tiendas

tiendas = {
    'Tienda A' : (1,1),
    'Tienda B' : (1,5),
    'Tienda C' : (7,1),
    'Tienda D' : (3,3),
    'Tienda E' : (4,8)
}

#convertir las coordenadas en un frame para facilitar el calculo

df_tiendas = pd.DataFrame(tiendas).T
df_tiendas.columns = ['X', 'Y']
print('Coordenadas de las tiendas: ')
print(df_tiendas)

#inicializamos los dataframe de lo que vamos a obtener para el calculo de distancias

distancias_punto1 = pd.DataFrame(index=df_tiendas.index, columns=df_tiendas.index)

distancias_punto2 = pd.DataFrame(index=df_tiendas.index, columns=df_tiendas.index)

distancias_punto3 = pd.DataFrame(index=df_tiendas.index, columns=df_tiendas.index)

#vamos a calcular las distancias
for i in df_tiendas.index:
    for j in df_tiendas.index:
        #defino la distancia euclidiana del primer punto
        distancias_punto1.loc[i, j] = distance.euclidean(df_tiendas.loc[i], df_tiendas.loc[j])
        
        distancias_punto2.loc[i, j] = distance.cityblock(df_tiendas.loc[i], df_tiendas.loc[j])
        
        distancias_punto3.loc[i, j] = distance.chebyshev(df_tiendas.loc[i], df_tiendas.loc[j])
        
#mostrar resultados
print('/n Distancia Euclidiana entre cada una de las tiendas: ')
print(distancias_punto1)


print('/n Distancia Manhatthan entre cada una de las tiendas: ')
print(distancias_punto2)


print('/n Distancia Chebyshev entre cada una de las tiendas: ')
print(distancias_punto3)        


#Calcularemos las distancias entre todos los pares de puntos y determinaremos cuáles están más alejados entre sí y cuáles están más cercanos, utilizando las distancias Euclidiana, Manhattan y Chebyshev.
#Ejercicio: Determinación de Distancias entre Puntos
#Puntos en el Plano

#Los puntos en el plano son los siguientes:

#    Punto A: (2, 3)
#   Punto B: (5, 4)
#    Punto C: (1, 1)
#    Punto D: (6, 7)
#    Punto E: (3, 5)
#    Punto F: (8, 2)
#    Punto G: (4, 6)
#    Punto H: (2, 1)

# Definimos las coordenadas de los puntos en el plano

puntos = {
    'Punto A': (2, 3),
    'Punto B': (5, 4),
    'Punto C': (1, 1),
    'Punto D': (6, 7),
    'Punto E': (3, 5),
    'Punto F': (8, 2),
    'Punto G': (4, 6),
    'Punto H': (2, 1)
}

# Convertimos las coordenadas en un DataFrame para facilitar el cálculo

df_puntos = pd.DataFrame(puntos).T
df_puntos.columns = ['X', 'Y']
print('Coordenadas de los puntos: ')
print(df_puntos)

# Inicializamos los dataframes de las distancias para cada tipo

distancias_euclidiana = pd.DataFrame(index=df_puntos.index, columns=df_puntos.index)
distancias_manhattan = pd.DataFrame(index=df_puntos.index, columns=df_puntos.index)
distancias_chebyshev = pd.DataFrame(index=df_puntos.index, columns=df_puntos.index)

# Calculamos las distancias para cada par de puntos

for i in df_puntos.index:
    for j in df_puntos.index:
        # Calculamos la distancia euclidiana
        distancias_euclidiana.loc[i, j] = distance.euclidean(df_puntos.loc[i], df_puntos.loc[j])
        
        # Calculamos la distancia Manhattan
        distancias_manhattan.loc[i, j] = distance.cityblock(df_puntos.loc[i], df_puntos.loc[j])
        
        # Calculamos la distancia Chebyshev
        distancias_chebyshev.loc[i, j] = distance.chebyshev(df_puntos.loc[i], df_puntos.loc[j])

# Mostrar resultados
print(f'\nDistancia Euclidiana entre cada uno de los puntos: ')
print(distancias_euclidiana)

print(f'\nDistancia Manhattan entre cada uno de los puntos: ')
print(distancias_manhattan)

print(f'\nDistancia Chebyshev entre cada uno de los puntos: ')
print(distancias_chebyshev)

# Determinamos cuáles son las distancias más cercanas y más alejadas entre los puntos en cada métrica

# Euclidiana
max_distancia_euclidiana = distancias_euclidiana.max().max()
min_distancia_euclidiana = distancias_euclidiana.min().min()

# Manhattan
max_distancia_manhattan = distancias_manhattan.max().max()
min_distancia_manhattan = distancias_manhattan.min().min()

# Chebyshev
max_distancia_chebyshev = distancias_chebyshev.max().max()
min_distancia_chebyshev = distancias_chebyshev.min().min()

print(f'\nMáxima distancia Euclidiana: {max_distancia_euclidiana}')
print(f'Mínima distancia Euclidiana: {min_distancia_euclidiana}')

print(f'\nMáxima distancia Manhattan: {max_distancia_manhattan}')
print(f'Mínima distancia Manhattan: {min_distancia_manhattan}')

print(f'\nMáxima distancia Chebyshev: {max_distancia_chebyshev}')
print(f'Mínima distancia Chebyshev: {min_distancia_chebyshev}')