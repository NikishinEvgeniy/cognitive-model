package io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model;

import java.util.List;

public record EigenvalueRequest(
        List<List<Double>> matrix
) {
}