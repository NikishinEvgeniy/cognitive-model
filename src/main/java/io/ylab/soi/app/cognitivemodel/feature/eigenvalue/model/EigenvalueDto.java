package io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model;

import java.util.List;

public record EigenvalueDto(
        List<List<Double>> matrix
) {
}