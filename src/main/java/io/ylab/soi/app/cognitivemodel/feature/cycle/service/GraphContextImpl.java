package io.ylab.soi.app.cognitivemodel.feature.cycle.service;

import org.jgrapht.Graph;
import org.jgrapht.alg.cycle.JohnsonSimpleCycles;
import org.jgrapht.graph.DefaultWeightedEdge;
import org.jgrapht.graph.SimpleWeightedGraph;
import org.springframework.stereotype.Component;

import java.util.List;

// TODO 1. его дженерики
// TODO 2. как получить значение по названию вершины
// TODO 3. johnsonSimpleCycles возвращает название вершин?
// TODO 4. Как задать тип названия вершин
@Component
public class GraphContextImpl implements GraphContext {

    private final Graph<String , DefaultWeightedEdge> graph;

    public GraphContextImpl(List<List<Double>> adjacencyMatrix) {
        this.graph = new SimpleWeightedGraph<>(DefaultWeightedEdge.class);
        // TODO Тут нужно инициализировать поле graph
    }
// TODO Мне нужно передавать весь граф (название вершины) + значения его штук, а тут просто его в объект сделать
    @Override
    public List<List<String>> getCycles() {
        JohnsonSimpleCycles johnsonSimpleCycles = new JohnsonSimpleCycles(graph);
        return johnsonSimpleCycles.findSimpleCycles();
    }

    @Override
    public Character getSign(List<String> cycle) {
        return null;
    }

    @Override
    public List<Character> getSigns(List<List<String>> cycles) {
        return cycles
                .stream()
                .map(this::getSign)
                .toList();
    }
}