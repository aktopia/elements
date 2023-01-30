#!/usr/bin/env bb

(ns extract-store-hook-ids
  (:require [cheshire.core :as json]))

(def value-rgx #"useValue(?:\<.+\>)?\([\",\'](.*)[\",\']\)")
(def dispatch-rgx #"useDispatch\([\",\'](.*)[\",\']\)")

(defn extract-value-ids
  [s]
  (->> (re-seq value-rgx s)
       (mapv second)
       (mapv (fn [id]
               [id ""]))
       (into {})))

(defn extract-dispatch-ids
  [s]
  (mapv second (re-seq dispatch-rgx s)))

(defn extract-store-hook-ids
  [s]
  (println (json/generate-string {:read (extract-value-ids s) :dispatch (extract-dispatch-ids s)})))

(defn -main
  [& args]
  (let [file-str (slurp (first args))]
    (extract-store-hook-ids file-str)))
