# Reporte de Corrección: ParticlesBackground

## Diagnóstico
La causa fue la **doble aplicación de opacidad**:
1. El canvas tenía `opacity: var(--nodes-opacity)` (0.1 en light, 0.4 en dark).
2. Los colores de dibujo tenían alpha bajo (0.4 y 0.15).
Resultado: Alpha efectivo extremadamente bajo (ej: 0.1 * 0.4 = 0.04), haciéndolo invisible.

## Solución Aplicada
Se modificó `src/components/ParticlesBackground.tsx`:
1. **Eliminada** la propiedad `opacity` del estilo del canvas.
2. **Añadida** detección de modo oscuro mediante `data-theme`.
3. **Ajustados** los colores para garantizar visibilidad:
   - **Light Mode**: Cyan 600 (`rgba(8, 145, 178, 0.3)`) para contraste sobre blanco.
   - **Dark Mode**: Cyan original (`rgba(100, 255, 218, 0.4)`).

## Checklist de Verificación
1. [ ] **Light Mode**: Confirmar partículas visibles (tono oscuro tenue).
2. [ ] **Dark Mode**: Confirmar partículas visibles (tono brillante neon).
3. [ ] **No Bugs**: Verificar que el redimensionado de ventana funciona y no hay errores en consola.
