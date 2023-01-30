#!/usr/bin/env bb

(ns extract-store-hook-ids
  (:require [cheshire.core :as json]))

(def value-rgx #"useValue(?:\<.+\>)?\([\",\'](.*)[\",\']\)")
(def dispatch-rgx #"useDispatch\([\",\'](.*)[\",\']\)")

(defn extract-value-ids
  [s]
  (let [value-ids (->> (re-seq value-rgx s)
                       (mapv second))]
    (prn "useValue ids:")
    (prn (json/generate-string value-ids))
    value-ids))


(defn extract-dispatch-ids
  [s]
  (let [dispatch-ids (mapv second (re-seq dispatch-rgx s))]
    (prn "useDispatch ids:")
    (prn (json/generate-string dispatch-ids))
    dispatch-ids))

(defn extract-store-hook-ids
  [s]
  (let [value-ids (extract-value-ids s)
        dispatches-mock (extract-dispatch-ids s)
        values-mock (->> value-ids
                         (mapv (fn [id]
                                 [id ""]))
                         (into {}))]
    (prn "mock-store:")
    (println (json/generate-string {:read values-mock :dispatch dispatches-mock}))))

(defn -main
  [& args]
  (let [file-str (slurp (first args))]
    (extract-store-hook-ids file-str)))
