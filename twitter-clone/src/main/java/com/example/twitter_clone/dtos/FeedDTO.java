package com.example.twitter_clone.dtos;

import java.util.List;

public record FeedDTO(List<FeedItemDTO> feedItens, int page, int size, int totalPages, int totalElements) {
}

