def get_dataset_partitions_tf(dataset, train_split=0.8, val_split=0.1, test_split=0.1,shuffle=True, shuffle_size = 10000):
    dataset_size = len(dataset)

    if shuffle:
        dataset = dataset.shuffle(shuffle_size, seed=12)
        
    train_size = int(dataset_size * train_split)
    validation_size = int(dataset_size * val_split)

    train_dataset = dataset.take(train_size)
    validation_dataset = dataset.skip(train_size).take(validation_size)
    test_dataset = dataset.skip(train_size).skip(validation_size)
    
    
    return train_dataset,validation_dataset,test_dataset