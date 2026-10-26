package io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model;

import java.util.List;

public record EigenvalueResponse(
        List<Double> eigenvalues
) {
}