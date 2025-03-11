import pandas as pd
import matplotlib.pyplot as plt

# Cargar el archivo CSV
df = pd.read_csv('./housing.csv')

# Seleccionar solo las columnas numéricas
columnas_numericas = df.select_dtypes(include='number').columns

# Calcular estadísticas básicas para las columnas numéricas
media = df[columnas_numericas].mean()
mediana = df[columnas_numericas].median()
moda = df[columnas_numericas].mode().iloc[0]  # Tomamos la primera moda (puede haber múltiples)
rango = df[columnas_numericas].max() - df[columnas_numericas].min()
varianza = df[columnas_numericas].var()
desviacion_estandar = df[columnas_numericas].std()

# Crear un DataFrame con las estadísticas
tabla_estadistica = pd.DataFrame({
    'Media': media,
    'Mediana': mediana,
    'Moda': moda,
    'Rango': rango,
    'Varianza': varianza,
    'Desviación Estándar': desviacion_estandar
})

# Mostrar la tabla estadística
print("Tabla Estadística:")
print(tabla_estadistica)

# Calcular el costo promedio de 'median_house_value'
costo_promedio = df['median_house_value'].mean()

# Datos para los gráficos de barras
x1 = df.index  # Usamos el índice como eje X para el primer gráfico
y1 = df['median_house_value']
y2 = df['population']
grosor1 = [0.4] * len(x1)  # Grosor constante para las barras de 'median_house_value'
grosor2 = [0.4] * len(x1)  # Grosor constante para las barras de 'population'

# Crear figura para los gráficos
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

# Gráfico 1: Comparación de 'median_house_value' con 'population'
ax1.bar(x=x1, height=y1, width=grosor1, label='Median House Value', color='skyblue', align='center')
ax1.bar(x=x1, height=y2, width=grosor2, label='Population', color='lightgreen', align='edge')

# Añadir una línea horizontal para el costo promedio de 'median_house_value'
ax1.axhline(costo_promedio, color='red', linestyle='--', label=f'Costo Promedio de Median House Value ({costo_promedio:.2f})')

# Configuración del primer gráfico
ax1.set_xlabel('Índice de registros')
ax1.set_ylabel('Valor')
ax1.set_title('Comparación de Median House Value y Population')
# Gráfico 2: Comparación de 'median_house_value' con el costo promedio
ax2.bar(x=x1, height=y1, width=grosor1, label='Median House Value', color='skyblue')

# Añadir una línea horizontal para el costo promedio
ax2.axhline(costo_promedio, color='red', linestyle='--', label=f'Costo Promedio ({costo_promedio:.2f})')

# Configuración del segundo gráfico
ax2.set_xlabel('Índice de registros')
ax2.set_ylabel('Valor')
ax2.set_title('Median House Value y Costo Promedio')

# Mostrar los gráficos
plt.tight_layout()
plt.show()
