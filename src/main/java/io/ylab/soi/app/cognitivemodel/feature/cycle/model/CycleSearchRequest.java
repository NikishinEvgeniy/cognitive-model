package io.ylab.soi.app.cognitivemodel.feature.cycle.model;

import java.util.List;

public record CycleSearchRequest(
        List<List<Integer>> adjacencyMatrix
) {
}
// TODO Сюда нужно добавить названия вершин
// TODO Нужно придумать формат для передачи всего графа