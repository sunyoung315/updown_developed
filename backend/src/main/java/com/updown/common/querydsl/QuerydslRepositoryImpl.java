//package com.updown.common.querydsl;
//
//import com.updown.diet.entity.FoodInfo;
//import com.updown.diet.entity.QFoodInfo;
//import org.springframework.stereotype.Repository;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Repository
//public class QuerydslRepositoryImpl implements QuerydslRepositoryCustom {
//
//    private final JPAQueryFactory queryFactory;
//
//    @Autowired
//    public QuerydslRepositoryImpl(JPAQueryFactory queryFactory) {
//        this.queryFactory = queryFactory;
//    }
//
//    @Override
//    public List<FoodInfo> searchByFoodInfoName(String searchStr) {
//        QFoodInfo foodInfo = QFoodInfo.foodInfo;
//
//        return queryFactory
//                .select(foodInfo)
//                        .from(foodInfo)
//                .where(foodInfo.foodInfoName.likeIgnoreCase("%" + searchStr + "%"))
//                .fetch();
//
//    }
//}
