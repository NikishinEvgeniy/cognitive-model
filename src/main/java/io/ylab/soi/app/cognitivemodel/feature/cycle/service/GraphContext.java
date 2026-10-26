package io.ylab.soi.app.cognitivemodel.feature.cycle.service;

import java.util.List;

public interface GraphContext {
    List<List<String>> getCycles();
    Character getSign(List<String> cycle);
    List<Character> getSigns(List<List<String>> cycles);
}